import { useSocket } from '~/app/models/hooks/use-socket';
import { useAuth } from '~/auth/models/hooks/use-auth';

import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { Form, MessageForm } from '../message-form/message-form';
import { useConversations } from '~/messages/models/hooks/use-conversations';

type ConversationFormContainerProps = {
  userIds: string[];
  id?: string;
};

const ConversationFormContainer = (props: ConversationFormContainerProps) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [, { create, createMessage }] = useConversations();
  const [isSending, setIsSending] = createSignal(false);
  const onSubmit = async (form: Form) => {
    try {
      let id = props.id;
      let messageId;
      setIsSending(true);
      if (!id) {
        const conversation = await create(props.userIds, form);
        id = conversation?.conversationId;
        messageId = conversation?.lastMessage?.messageId;
      } else {
        const message = await createMessage(id, form);
        messageId = message?.messageId;
      }
      setIsSending(false);
      socket()?.emit('message', { conversationId: id, id: messageId });
      navigate(`/messages/${id}`);
    } catch (error) {
      setIsSending(false);
    }
  };

  return <MessageForm isSending={isSending()} onSubmit={onSubmit} />;
};

export default ConversationFormContainer;
