'use server';

import { isBefore } from '~/app/helpers/date';
import { getSession } from '~/db/session';

export default async (): Promise<boolean> => {
  const session = await getSession();
  const payload = session?.data.token;
  if (!payload) {
    return false;
  }
  const isAuthenticated = isBefore(payload.expires, Date.now());
  return isAuthenticated;
};
