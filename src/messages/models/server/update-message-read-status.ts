'use server';

import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { MessageReponse } from '../services/generated/message.client';
import { ReadConversationMessageRequest, updateMessageReadStatus } from '../services/message.service';

export default async (id: string, messageIds: string[]): Promise<MessageReponse[]> => {
  const token = await getOrRefreshUserToken();
  const request: ReadConversationMessageRequest = {
    accessToken: token?.accessToken || '',
    id,
    messageIds,
    url: import.meta.env.VITE_CHAT_API,
  };
  const response = await updateMessageReadStatus(request);
  return response;
};
