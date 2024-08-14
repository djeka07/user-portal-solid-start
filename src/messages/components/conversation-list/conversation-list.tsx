/* eslint-disable solid/reactivity */
import { Match, Switch } from 'solid-js';
import { Icon } from '~/app/components/icons';
import Link from '~/app/components/links/link';
import { Error } from '~/app/components/lists';
import { Typography } from '~/app/components/typographies';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { ConversationFetchState, ConversationState } from '~/messages/models/contexts/conversation.state';
import { UserResponse } from '~/user/models/services/generated/user.client';
import { ConversationsResponse } from '../../models/services/generated/message.client';
import { Conversations, ConversationsSkeleton } from './components/conversations';
import { headingWrapper, svg } from './conversation-list.css';

type ConversationListProps = {
  conversations?: ConversationsResponse;
  selectedConversationId?: string;
  user: UserResponse;
  state: ConversationFetchState;
  items: ConversationState[];
  total: number;
};

const ConversationList = (props: ConversationListProps) => {
  const [{ t }] = useI18n();
  return (
    <>
      <div class={headingWrapper}>
        <Typography variant="h4">{t('messages.conversation-list.title')}</Typography>
        <Link title={t('messages.conversation-list.create-new')} href="/messages/new">
          <Icon class={svg} name="Edit" />
        </Link>
      </div>
      <Switch>
        <Match when={props.state === 'pending'}>
          <>
            <ConversationsSkeleton />
            <ConversationsSkeleton />
            <ConversationsSkeleton />
          </>
        </Match>
        <Match when={props.state === 'errored'}>
          <Error message="Could not fetch messages" />
        </Match>
        <Match when={props.state === 'ready'}>
          <Conversations
            user={props.user}
            selectedConversationId={props.selectedConversationId}
            items={props.items || []}
            total={props.total || 0}
          />
        </Match>
      </Switch>
    </>
  );
};

export default ConversationList;
