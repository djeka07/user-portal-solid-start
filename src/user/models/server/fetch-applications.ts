'use server';

import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { fetchApplications } from '../services/user.service';
import { GetApplicationsResponse } from '../services/generated/user.client';

export default async (page: number, take: number): Promise<GetApplicationsResponse> => {
  const token = await getOrRefreshUserToken();
  return fetchApplications({ accessToken: token?.accessToken, page, take, url: import.meta.env.VITE_USER_API });
};
