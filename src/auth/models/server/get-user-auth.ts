'use server';

import { Authorization } from '~/app/helpers/token';
import { getSession } from '~/db/session';

export default async (): Promise<Authorization | null> => {
  const session = await getSession();
  const payload = session?.data;
  if (!payload) {
    return null;
  }
  return payload?.token;
};
