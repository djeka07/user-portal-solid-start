import { useContext } from 'solid-js';
import { Form } from '~/messages/components/conversation/components/message-form/message-form';
import { ConversationsContext, ConversationsContextType } from '../contexts/conversations.context';
import { ConversationResponse } from '../services/generated/message.client';

export type ConversationsActions = {
  create: (userIds: string[], form: Form) => Promise<ConversationResponse>;
  fetch: (page: number, take?: number) => Promise<void>;
  push: (conversations: ConversationResponse[]) => void;
};

export function useConversations(): ConversationsContextType {
  const context = useContext(ConversationsContext);

  if (!context) {
    throw new Error('useConversations need to me in ConversationProvider');
  }

  return context;
}
