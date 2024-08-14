import { JSX, createContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { Form } from '~/messages/components/conversation/components/message-form/message-form';
import { MessageReponse } from '~/messages/models/services/generated/message.client';
import createConversation from '../server/create-conversation';
import createMessage from '../server/create-message';
import fetchConversationMessages from '../server/fetch-conversation-messages';
import fetchConversations from '../server/fetch-conversations';
import updateMessageReadStatus from '../server/update-message-read-status';
import { ConversationActions, ConversationFetchState, ConversationsState } from './conversation.state';
import createConversationWithDefaultValue from './create-conversation-with-default-value';

export const ConversationsContext = createContext<ConversationsContextType>();

type ConversationProviderProps = {
  id?: string;
  children: JSX.Element;
};

export type ConversationsContextType = [ConversationsState, ConversationActions];

const getInitalState = (id?: string): ConversationsState => ({
  conversations: !!id ? [{ conversationId: id, state: 'pending' }] : [],
  state: 'pending',
  total: 0,
});

export const ConversationsProvider = (props: ConversationProviderProps) => {
  const [state, setState] = createStore<ConversationsState>(getInitalState(props.id));

  const context: ConversationsContextType = [
    state,
    {
      createMessage: async (id: string, form: Form): Promise<MessageReponse | null> => {
        try {
          setState(
            'conversations',
            (s) => s.conversationId === id,
            (prev) => ({
              ...prev,
              [id]: createConversationWithDefaultValue({ ...(prev || {}), state: 'sending' }),
            }),
          );
          const response = await createMessage(id, form);
          setState(
            `conversations`,
            (s) => s.conversationId === id,
            produce((prev) => {
              prev.state = 'ready';
              (prev?.items || []).push(response);
              prev.total = (prev?.total || 0) + 1;
            }),
          );
          return response;
        } catch (error) {
          setState(
            'conversations',
            (s) => s.conversationId === id,
            (prev) => ({
              ...prev,
              [id]: createConversationWithDefaultValue({ ...(prev || {}), state: 'errored' }),
            }),
          );
          return null;
        }
      },
      create: async (userIds: string[], form: Form) => {
        const response = await createConversation(userIds, form);
        setState(
          'conversations',
          produce((state) => {
            state.push(createConversationWithDefaultValue(response));
          }),
        );
        return response;
      },
      readMessages: async (id: string, messageIds: string[]) => {
        const response = await updateMessageReadStatus(id, messageIds);
        setState(
          'conversations',
          (s) => s.conversationId === id,
          produce((prev) => {
            const items = prev.items?.map((item) => {
              const readMessageItem = response?.find((r) => r.messageId === item.messageId);
              return { ...item, readBy: readMessageItem?.readBy || [] };
            });
            prev.items = items;
          }),
        );
      },
      fetchMessages: async (id: string, page: number = 1, take: number = 20) => {
        try {
          setState(
            'conversations',
            (s) => s.conversationId === id,
            produce((s) => {
              if (page > 1) {
                s.state = 'pending-next';
              } else {
                s.state = 'pending';
              }
            }),
          );

          const messages = await fetchConversationMessages(id, page, take);
          setState(
            'conversations',
            (s) => s.conversationId === id,
            produce((state) => {
              state.hasNextPage = messages.hasNextPage;
              state.total = messages.total;
              state.state = 'ready';
              state.page = messages.page;
              if (page > 1) {
                state.items?.unshift(...messages?.items);
              } else {
                state.items = messages?.items;
              }
            }),
          );
        } catch (error) {
          setState(
            'conversations',
            (s) => s.conversationId === id,
            produce((prev) => {
              prev.state = 'errored';
            }),
          );
        }
      },
      fetch: async (page: number, take: number = 20) => {
        setState('state', 'pending');
        const response = await fetchConversations(page, take);
        setState(
          produce((prev) => {
            prev.conversations = response.items.map((i) => {
              const prevConverstion = state.conversations?.find((s) => s.conversationId === i.conversationId);
              return {
                ...(prevConverstion || {}),
                ...i,
                state: 'ready' as ConversationFetchState,
              };
            });
            prev.state = 'ready';
            prev.total = response.total;
          }),
        );
      },
      updateMessages: (id: string, messages: MessageReponse[]): void => {
        setState(
          'conversations',
          (s) => s.conversationId === id,
          produce((prev) => {
            const items = prev.items?.map((item) => {
              const readMessageItem = messages?.find((r) => r.messageId === item.messageId);
              return readMessageItem || item;
            });

            prev.items = items;
          }),
        );
      },
      pushMessages: (id: string, messages: MessageReponse[]) => {
        setState(
          'conversations',
          (s) => s.conversationId === id,
          produce((prev) => {
            (prev?.items || []).push(...messages);
            prev.total = (prev?.items || []).length;
          }),
        );
      },
    },
  ];

  return <ConversationsContext.Provider value={context}>{props.children}</ConversationsContext.Provider>;
};
