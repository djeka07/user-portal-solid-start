/* eslint-disable @typescript-eslint/no-explicit-any */
import createHeaders from '~/app/models/create-headers';
import {
  ConversationResponse,
  ConversationUserResponse,
  ConversationsResponse,
  CreateConversationRequest,
  MessageReponse,
  MessagesResponse,
} from './generated/message.client';
import { fetch } from '@djeka07/fetch-service';

type FetchConversationsRequest = {
  accessToken: string;
  url: string;
  page: number;
  take: number;
};

export type FetchConversationRequest = Pick<FetchConversationsRequest, 'url' | 'accessToken'> & {
  id: string;
};

export type FetchConversationMessagesRequest = FetchConversationsRequest & {
  id: string;
};

export type FetchConversationUsersRequest = Omit<FetchConversationsRequest, 'page' | 'take'> & {
  id: string;
};

type FetchConversationFromUsersRequest = {
  userIds: string[];
  accessToken: string;
  url: string;
};

export type CreateConversationMessage = {
  message: string;
  id: string;
  accessToken: string;
  url: string;
};

export type ReadConversationMessageRequest = {
  accessToken: string;
  url: string;
  id: string;
  messageIds: string[];
};

export type CreateConversation = {
  userIds: string[];
  message?: string;
  accessToken: string;
  url: string;
};
export const fetchConversations = ({
  accessToken,
  url,
  page,
  take,
}: FetchConversationsRequest): Promise<ConversationsResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ url, headers: headers, path: '/api/v1/conversations', query: { take, page } });
};

export const fetchConversation = ({
  accessToken,
  id,
  url,
}: FetchConversationRequest): Promise<ConversationResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ url, headers: headers, path: `/api/v1/conversations/${id}` });
};

export const fetchConversationMessages = ({
  accessToken,
  id,
  url,
  page,
  take,
}: FetchConversationMessagesRequest): Promise<MessagesResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ url, headers: headers, path: `/api/v1/conversations/${id}/messages`, query: { take, page } });
};

export const fetchConversationFromUsers = ({
  accessToken,
  url,
  userIds,
}: FetchConversationFromUsersRequest): Promise<ConversationResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ url, headers: headers, path: '/api/v1/conversations/users', query: { userIds } });
};

export const fetchConversationUsers = ({
  accessToken,
  id,
  url,
}: FetchConversationUsersRequest): Promise<ConversationUserResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ url, headers: headers, path: `/api/v1/conversations/${id}/users` });
};

export const createConversation = ({
  accessToken,
  url,
  userIds,
  message,
}: CreateConversation): Promise<ConversationResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch<CreateConversationRequest, ConversationResponse>({
    method: 'POST',
    url,
    path: '/api/v1/conversations',
    headers,
    body: { userIds, message },
  });
};

export const createConversationMessage = ({
  accessToken,
  message,
  url,
  id,
}: CreateConversationMessage): Promise<MessageReponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({
    method: 'POST',
    url,
    headers,
    path: `/api/v1/conversations/${id}/messages`,
    body: { message },
  });
};

export const updateMessageReadStatus = async ({
  accessToken,
  id,
  messageIds,
  url,
}: ReadConversationMessageRequest): Promise<MessageReponse[]> => {
  const headers = createHeaders({ accessToken });
  return fetch({
    method: 'PUT',
    url,
    headers,
    path: `/api/v1/conversations/${id}/messages/read`,
    body: { messageIds },
  });
};
