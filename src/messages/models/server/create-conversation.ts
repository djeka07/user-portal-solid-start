'use server';

import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { Form } from '~/messages/components/conversation/components/message-form/message-form';
import { ConversationResponse, MessageReponse } from '../services/generated/message.client';
import { CreateConversation, createConversation } from '../services/message.service';

export default async (userIds: string[], form: Form): Promise<ConversationResponse> => {
  const token = await getOrRefreshUserToken();
  const request: CreateConversation = {
    accessToken: token?.accessToken || '',
    userIds,
    message: form?.message,
    url: import.meta.env.VITE_CHAT_API,
  };
  const response = await createConversation(request);
  return response;
};
