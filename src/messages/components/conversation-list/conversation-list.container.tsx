import { useParams } from '@solidjs/router';
import { createMemo, onCleanup, onMount } from 'solid-js';
import { useSocket } from '~/app/models/hooks/use-socket';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { MessageReponse } from '~/messages/models/services/generated/message.client';
import { SocketEvent } from '~/notifications/models/services/generated/notification.client';
import ConversionList from './conversation-list';

const ConversationListContainer = () => {
  const { socket } = useSocket();
  const [authState] = useAuth();
  const params = useParams();
  const [state, { fetch }] = useConversations();
  const conversations = createMemo(() => Object.values(state.conversations || []));

  const onMessage = (message: MessageReponse) => {
    console.log(message);
  };

  onMount(async () => {
    await fetch(1, 10);
    socket().on(SocketEvent.MESSAGE_CREATED, onMessage);
  });

  onCleanup(() => {
    socket()?.off(SocketEvent.MESSAGE_CREATED, onMessage);
  });

  return (
    <ConversionList
      user={authState.user}
      selectedConversationId={params.id}
      state={state.state}
      items={conversations()}
      total={state.total}
    />
  );
};

export default ConversationListContainer;
