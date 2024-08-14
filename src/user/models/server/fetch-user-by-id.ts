import { cache } from '@solidjs/router';
import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { FetchUserByIdRequest, fetchUserById } from '../services/user.service';

export default cache(async (id: string) => {
  'use server';
  try {
    const userTokens = await getOrRefreshUserToken();
    if (userTokens?.accessToken) {
      const request: FetchUserByIdRequest = {
        accessToken: userTokens.accessToken,
        id,
        url: process.env?.VITE_USER_API as string,
      };
      const user = await fetchUserById(request);
      return user;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
}, 'user');
