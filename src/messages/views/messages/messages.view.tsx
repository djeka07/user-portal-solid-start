import { useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { Spinner } from '~/app/components/spinners';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import { root } from './messages.view.css';

const MessagesView = () => {
  const navigate = useNavigate();
  const [state] = useConversations();

  createEffect(() => {
    if (state.state !== 'pending') {
      setTimeout(() => {
        console.log(state.conversations);
        const firstId = state.conversations[0]?.conversationId || 'new';
        navigate(`/messages/${firstId}`);
      }, 0);
    }
  });

  return (
    <div class={root}>
      <Spinner />
    </div>
  );
};

export default MessagesView;
