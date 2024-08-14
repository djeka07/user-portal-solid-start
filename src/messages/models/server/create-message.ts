'use server';

import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { CreateConversationMessage, createConversationMessage } from '../services/message.service';
import { MessageReponse } from '../services/generated/message.client';
import { Form } from '~/messages/components/conversation/components/message-form/message-form';

export default async (id: string, form: Form): Promise<MessageReponse> => {
  const token = await getOrRefreshUserToken();
  const request: CreateConversationMessage = {
    accessToken: token?.accessToken || '',
    id,
    message: form?.message,
    url: import.meta.env.VITE_CHAT_API,
  };
  const response = await createConversationMessage(request);
  return response;
};
