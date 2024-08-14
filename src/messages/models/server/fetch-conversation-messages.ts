'use server';
import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { fetchConversationMessages } from '../services/message.service';
import { MessagesResponse } from '../services/generated/message.client';

export default async (id: string, page: number, take: number = 10): Promise<MessagesResponse> => {
  const token = await getOrRefreshUserToken();
  const request = {
    accessToken: token?.accessToken as string,
    page,
    id,
    take,
    url: import.meta.env.VITE_CHAT_API as string,
  };

  const response = await fetchConversationMessages(request);
  return response;
};
