##################
# BUILD FOR LOCAL DEVELOPMENT
##################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install --immutable

COPY --chown=node:node . .

USER node

#######x############
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN apk update
RUN apk add curl 

RUN curl https://staticaks.blob.core.windows.net/static/configs/.env --output .env

ENV NODE_ENV production

RUN yarn workspaces focus && yarn cache clean --all

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/.output ./.output
COPY --chown=node:node --from=build /usr/src/app/.vinxi ./.vinxi
COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/.env ./

ENV PORT 80

CMD ["node", "./.output/server/index.mjs" ]