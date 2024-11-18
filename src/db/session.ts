'use server';
import { Authorization } from '~/app/helpers/token';

import { SessionData, useSession } from 'vinxi/http';

export async function getSession() {
  try {
    const session = await useSession({
      password: process.env.VITE_SESSION_PASSWORD || ('thisisasuperlongpasswordthatissafe' as string),
    });
    return session;
  } catch (error) {
    return undefined;
  }
}

export async function clearSession() {
  const session = await getSession();
  await session?.update((d) => {
    d.token = undefined;
    return d;
  });
}

export async function createUserSession(token: Authorization) {
  const session = await getSession();
  await session?.update((d: SessionData) => {
    d.token = token;
    return d;
  });
  return;
}
