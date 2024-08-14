'use server';
import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { UsersResponse } from '../services/generated/user.client';
import { FetchUsersRequest, fetchUsers } from '../services/user.service';

export default async (
  page: number,
  take: number = 10,
  hasGrantedFilter: boolean | undefined = undefined,
): Promise<UsersResponse> => {
  const token = await getOrRefreshUserToken();
  const request: FetchUsersRequest = {
    url: import.meta.env.VITE_USER_API,
    accessToken: token?.accessToken,
    page,
    take,
  };

  if (hasGrantedFilter !== undefined) {
    request.filter = { hasGrantedAccess: hasGrantedFilter };
  }

  return fetchUsers(request);
};
