import { useSocket } from '~/app/models/hooks/use-socket';

import mapMessageResponseToConversationMessage from './map-message-response-to-conversation-message-response';
import { Form, MessageForm } from './message-form';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { createMemo } from 'solid-js';

type MessageFormContainerProps = {
  id: string;
};

const MessageFormContainer = (props: MessageFormContainerProps) => {
  const { socket } = useSocket();
  const [state, { createMessage }] = useConversations();
  const conversation = createMemo(() => state.conversations?.find((c) => c.conversationId === props.id));

  const onSubmit = async ({ message }: Form) => {
    const msg = await createMessage(props.id, { message });
    socket()?.emit('message', { conversationId: props.id, id: msg?.messageId });
  };

  return <MessageForm isSending={conversation()?.state === 'sending' || false} onSubmit={onSubmit} />;
};

export default MessageFormContainer;
