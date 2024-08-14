'use server';

import { Authorization } from '~/app/helpers/token';
import getUserAuth from './get-user-auth';

import { isBefore } from '~/app/helpers/date';
import refreshAuthentication from './refresh-authentication';

export default async (): Promise<Authorization | null> => {
  const authorization = await getUserAuth();
  if (!!authorization?.accessToken && !isBefore(authorization?.expires, Date.now())) {
    const response = await refreshAuthentication(authorization!.refreshToken);
    return response;
  }
  return authorization;
};
