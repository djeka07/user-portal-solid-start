import { Form } from '~/messages/components/conversation/components/message-form/message-form';
import {
  ConversationResponse,
  ConversionMessageResponse,
  MessageReponse,
  UserResponse,
} from '../services/generated/message.client';
import { FetchState } from '~/app/models/types/fetch.state';

export type ConversationState = {
  users?: UserResponse[];
  conversationName?: string;
  conversationId?: string;
  isGroup?: boolean;
  lastMessage?: ConversionMessageResponse;
  items?: MessageReponse[];
  page?: number;
  total?: number;
  hasNextPage?: boolean;
  state: ConversationFetchState;
};

export type ConversationFetchState = FetchState | 'creating' | 'pending-next' | 'sending';

export type ConversationsState = {
  conversations: ConversationState[];
  total: number;
  state: ConversationFetchState;
};

export type ConversationActions = {
  createMessage: (id: string, form: Form) => Promise<MessageReponse | null>;
  create: (userIds: string[], form: Form) => Promise<ConversationResponse>;
  readMessages: (id: string, messageIds: string[]) => Promise<void>;
  fetchMessages: (id: string, page?: number, take?: number) => Promise<void>;
  fetch: (page: number, take?: number) => Promise<void>;
  updateMessages: (id: string, messages: MessageReponse[]) => void;
  pushMessages: (id: string, messages: MessageReponse[]) => void;
};
