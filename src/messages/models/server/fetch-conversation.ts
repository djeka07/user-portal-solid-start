'use server';
import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';
import { fetchConversation } from '../services/message.service';
import { ConversationResponse, MessagesResponse } from '../services/generated/message.client';
import { redirect } from '@solidjs/router';
import logout from '~/auth/models/server/logout';

export default async (id: string): Promise<ConversationResponse> => {
  try {
    const token = await getOrRefreshUserToken();
    const request = {
      accessToken: token?.accessToken as string,
      id,
      url: import.meta.env.VITE_CHAT_API as string,
    };

    const response = await fetchConversation(request);
    return response;
  } catch (error) {
    console.log('errorr', error);
    const redirect = await logout();
    throw redirect;
  }
};
