'use server';

import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { ConversationResponse } from '../services/generated/message.client';
import { fetchConversationFromUsers } from '../services/message.service';

export default async (ids: string[]): Promise<ConversationResponse> => {
  const token = await getOrRefreshUserToken();
  const request = {
    accessToken: token?.accessToken as string,
    userIds: ids,
    url: import.meta.env.VITE_CHAT_API,
  };

  const response = await fetchConversationFromUsers(request);
  return response;
};
