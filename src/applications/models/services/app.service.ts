import { fetch } from '@djeka07/fetch-service';
import createHeaders from '~/app/models/create-headers';
import { GetApplicationsResponse } from '~/user/models/services/generated/user.client';

type FetchApplicationsRequest = {
  page: number;
  take: number;
  url: string;
  accessToken: string;
};

export const fetchApplications = async ({
  accessToken,
  url,
  page,
  take,
}: FetchApplicationsRequest): Promise<GetApplicationsResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ url, path: '/api/v1/applications', headers, query: { page, take } });
};
