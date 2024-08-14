import { RouteSectionProps } from '@solidjs/router';
import { Match, Switch, createEffect, createMemo } from 'solid-js';
import { Spinner } from '~/app/components/spinners';
import { Conversation } from '../../components/conversation';
import { useConversations } from '~/messages/models/hooks/use-conversations';

type MessageViewProps = RouteSectionProps;

const MessageView = (props: MessageViewProps) => {
  const [state, { fetchMessages }] = useConversations();
  const conversation = createMemo(() => state.conversations.find((i) => i.conversationId === props.params.id));

  createEffect(() => {
    fetchMessages(props.params.id);
  });

  return (
    <Switch
      fallback={
        <div style={{ width: '100%', display: 'flex', 'justify-content': 'center' }}>
          <Spinner />
        </div>
      }
    >
      <Match when={conversation()?.state !== 'pending'}>
        <Conversation id={props.params.id} />
      </Match>
    </Switch>
  );
};

export default MessageView;
