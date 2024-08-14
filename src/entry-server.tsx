/* eslint-disable solid/no-innerhtml */
import { StartServer, createHandler } from '@solidjs/start/server';
import { getLocale } from './app/helpers/locale';
import createVariables from '~/app/styles/variables';
import dotenv from 'dotenv';

dotenv.config();

export default createHandler(
  (page) => (
    <StartServer
      document={({ assets, children, scripts }) => {
        const locale = getLocale(page?.request);
        return (
          <html lang={locale}>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
              {createVariables()}
              {assets}
            </head>
            <body>
              <div id="app">{children}</div>
              {scripts}
            </body>
          </html>
        );
      }}
    />
  ),
  { mode: 'async' },
);
