import { createSignal, Match, Show, Switch } from 'solid-js';
import { isEmpty } from '~/app/helpers/array';
import { ProgressState } from '~/app/models/types/fetch.state';
import { ConversationFormContainer } from '~/messages/components/conversation/components/conversation-form';
import { UserResponse } from '~/user/models/services/generated/user.client';

import { Title } from '@solidjs/meta';
import { UserPillInputContainer } from '~/user/components/user-pill-input';
import { ConversationResponse } from '../../models/services/generated/message.client';
import { newMessageWrapper, root, wrapper } from './new-message.view.css';
import { Spinner } from '~/app/components/spinners';
import { Typography } from '~/app/components/typographies';
import { MessagesContainer } from '~/messages/components/conversation/components/messages';
import { useI18n } from '~/app/models/contexts/i18n.context';
import fetchConversationFromUsers from '~/messages/models/server/fetch-conversation-from-users';
import { useConversations } from '~/messages/models/hooks/use-conversations';

const NewMessageView = () => {
  const [{ t }] = useI18n();
  const [selectedUsers, setSelectedUsers] = createSignal<UserResponse[]>([]);
  const [, { fetchMessages }] = useConversations();
  const [conversationState, setConversationState] = createSignal<ProgressState<ConversationResponse>>({
    state: 'initial',
  });

  const onSelectUser = async (user: UserResponse) => {
    setSelectedUsers((prev) => [...prev, user]);
    fetchConversation();
  };

  const onDeleteUser = async (id: string) => {
    setSelectedUsers((prev) => prev.filter((u: UserResponse) => u.id !== id));
    fetchConversation();
  };

  const fetchConversation = async () => {
    try {
      setConversationState((prev) => ({ ...prev, state: 'pending' }));
      if (!isEmpty(selectedUsers())) {
        const response = await fetchConversationFromUsers(selectedUsers()?.map((user) => user.id));
        setConversationState((prev) => ({ ...prev, data: response, state: 'ready' }));
        await fetchMessages(response.conversationId);
      }
    } catch (error) {
      setConversationState((prev) => ({ ...prev, data: undefined, state: 'ready' }));
    }
  };

  return (
    <div class={root}>
      <Title> {t('form.conversation.title')}</Title>
      <UserPillInputContainer onSelectUser={onSelectUser} selectedUsers={selectedUsers()} onDeleteUser={onDeleteUser} />
      <div class={wrapper}>
        <Show when={!isEmpty(selectedUsers())}>
          <Switch>
            <Match when={conversationState().state === 'pending'}>
              <Spinner />
            </Match>
            <Match when={conversationState().state === 'ready'}>
              <Show
                when={conversationState().data?.conversationId}
                fallback={
                  <div class={newMessageWrapper}>
                    <Typography align="center" weight="bold" color="light">
                      {t('form.conversation.title')}
                    </Typography>
                  </div>
                }
              >
                <MessagesContainer id={conversationState().data?.conversationId as string} />
              </Show>
            </Match>
          </Switch>
        </Show>
      </div>
      <Show when={!isEmpty(selectedUsers())}>
        <ConversationFormContainer
          id={conversationState().data?.conversationId}
          userIds={selectedUsers()?.map((u) => u.id)}
        />
      </Show>
    </div>
  );
};

export default NewMessageView;
