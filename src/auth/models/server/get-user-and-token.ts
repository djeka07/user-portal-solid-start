'use server';
import { GetTokenResponse } from '~/db/session.type';
import getOrRefreshUserToken from './get-or-refresh-user-token';
import { fetchRoles, getSelf } from '~/user/models/services/user.service';
import logout from './logout';

export default async (): Promise<GetTokenResponse | null> => {
  try {
    const token = await getOrRefreshUserToken();
    if (!token) {
      return null;
    }
    const [user, roles] = await Promise.all([
      getSelf({ accessToken: token.accessToken, url: process.env.VITE_USER_API as string }),
      fetchRoles({ accessToken: token.accessToken, url: process.env.VITE_USER_API as string }),
    ]);
    return { user, token, roles };
  } catch (error) {
    const redirect = await logout();
    throw redirect;
  }
};
