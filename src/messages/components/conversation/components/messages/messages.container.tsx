import { createEffect, createMemo, onCleanup, onMount } from 'solid-js';
import { useSocket } from '~/app/models/hooks/use-socket';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { SocketEvent } from '~/notifications/models/services/generated/notification.client';
import { MessageReponse } from '../../../../models/services/generated/message.client';
import Messages from './messages';
import { useConversations } from '~/messages/models/hooks/use-conversations';

type MessagesContainerProps = {
  id: string;
};

const MessagesContainer = (props: MessagesContainerProps) => {
  const [authState] = useAuth();
  const [state, { pushMessages, fetchMessages, readMessages, updateMessages }] = useConversations();
  const { socket, loggedInUsers } = useSocket();
  const conversation = () => state.conversations?.find((c) => c.conversationId === props.id);

  const onMessageRecieved = (message: MessageReponse) => {
    if (!conversation()?.items?.find((s) => s.messageId === message?.messageId)) {
      pushMessages(props.id, [message]);
    }
  };

  const onMessagesRead = (messageIds: string[]) => {
    readMessages(props.id, messageIds);
  };

  const onReadMessageReceived = (messages: MessageReponse[]) => {
    updateMessages(props.id, messages);
  };

  onMount(() => {
    socket()?.on(SocketEvent.MESSAGE_CREATED, onMessageRecieved);
    socket()?.on(SocketEvent.MESSAGE_READ, onReadMessageReceived);
  });

  onCleanup(() => {
    socket()?.off(SocketEvent.MESSAGE_CREATED, onMessageRecieved);
    socket()?.off(SocketEvent.MESSAGE_READ, onReadMessageReceived);
  });

  return (
    <Messages
      conversation={conversation()}
      onFetch={() => fetchMessages(props.id, (conversation()?.page || 1) + 1)}
      id={props.id}
      currentUser={authState.user}
      loggedInUsers={loggedInUsers()}
      onMessagesRead={onMessagesRead}
    />
  );
};

export default MessagesContainer;
