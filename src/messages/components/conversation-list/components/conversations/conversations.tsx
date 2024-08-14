/* eslint-disable solid/reactivity */
import { For, Show } from 'solid-js';
import { createDate } from '~/app/helpers/date';
import { ConversionMessageResponse } from '~/messages/models/services/generated/message.client';
import { UserResponse } from '~/user/models/services/generated/user.client';

import { UserBadges } from '~/app/components/badges';
import Link from '~/app/components/links/link';
import { subString } from '~/app/helpers/string';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { ConversationState } from '~/messages/models/contexts/conversation.state';
import {
  conversationItem,
  conversationName,
  lastMessage,
  lastMessageTime,
  lastMessageWrapper,
  messages,
  numberOfConversations,
} from './conversations.css';

type ConversationsProps = {
  items: ConversationState[];
  user: UserResponse;
  selectedConversationId?: string;
  total: number;
};

const Conversations = (props: ConversationsProps) => {
  const [{ t }] = useI18n();

  const getConversationName = (item: ConversationState): string => {
    if (item.conversationName) {
      return item.conversationName;
    }

    if (item?.users?.length === 1) {
      const [user] = item.users;
      return `${user.firstName} ${user.lastName}`;
    }

    const filtered = item?.users?.filter((u) => u.userId !== props.user?.id) || [];
    return filtered.map((u) => `${u.firstName} ${u.lastName}`).join(', ');
  };

  const getLastMessage = (item: ConversationState): string => {
    return `${item?.lastMessage?.from === props.user?.id ? t('label.you') : ''} ${subString(
      item.lastMessage?.message,
      30,
    )}`;
  };

  const getDate = (lastMessage?: ConversionMessageResponse): string => {
    if (!lastMessage) {
      return '';
    }
    const day = createDate(lastMessage?.createdAt);
    return day.fromNow();
  };
  return (
    <>
      <div class={messages}>
        <For each={props.items}>
          {(item) => {
            const badgeUsers = (item?.users || [])
              ?.filter((u) => (item.users?.length === 1 ? true : u.userId !== props.user.id))
              ?.slice(0, 2);

            return (
              <Link
                title={t('messages.conversation-list.messages-with', {
                  users: badgeUsers?.map((u) => `${u.firstName} ${u.lastName}`).join(', '),
                })}
                href={`/messages/${item.conversationId}`}
                class={conversationItem({
                  selected: props.selectedConversationId === item.conversationId,
                })}
              >
                <UserBadges items={badgeUsers} />
                <div class={lastMessageWrapper}>
                  <div class={conversationName}>{getConversationName(item)}</div>
                  <div>
                    <Show when={!!item?.lastMessage}>
                      <div class={lastMessage}>{getLastMessage(item)}</div>
                    </Show>
                    <div class={lastMessageTime}>{getDate(item.lastMessage)}</div>
                  </div>
                </div>
              </Link>
            );
          }}
        </For>
      </div>
      <div class={numberOfConversations}>
        {t('messages.conversation-list.number-of-messages', { count: props.total })}
      </div>
    </>
  );
};

export default Conversations;
