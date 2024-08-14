'use server';
import { Authorization, createToken } from '~/app/helpers/token';
import { clearSession, createUserSession } from '~/db/session';
import { refresh } from '~/user/models/services/user.service';

export default async (token: string): Promise<Authorization> => {
  try {
    const response = await refresh({
      token,
      url: process.env.VITE_USER_API as string,
    });
    const auth = createToken(response);
    await createUserSession(auth);
    return auth;
  } catch (err) {
    await clearSession();
    throw err;
  }
};
