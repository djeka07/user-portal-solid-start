'use server';

import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { fetchConversations } from '../services/message.service';
import { ConversationsResponse } from '../services/generated/message.client';

export default async (page: number, take: number = 10): Promise<ConversationsResponse> => {
  const token = await getOrRefreshUserToken();
  const request = {
    accessToken: token?.accessToken as string,
    page,
    take,
    url: import.meta.env.VITE_CHAT_API as string,
  };

  const response = await fetchConversations(request);
  return response;
};
