'use server';

import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { fetchConversationUsers } from '../services/message.service';
import { ConversationUserResponse } from '../services/generated/message.client';

export default async (id: string): Promise<ConversationUserResponse> => {
  const token = await getOrRefreshUserToken();
  const request = {
    accessToken: token?.accessToken as string,
    id,
    url: import.meta.env.VITE_CHAT_API as string,
  };

  const response = await fetchConversationUsers(request);
  return response;
};
