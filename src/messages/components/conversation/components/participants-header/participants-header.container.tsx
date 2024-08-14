import { useNavigate } from '@solidjs/router';
import { Match, Show, Switch, createDeferred, createEffect, createMemo } from 'solid-js';
import { useSocket } from '~/app/models/hooks/use-socket';
import { useAuth } from '~/auth/models/hooks/use-auth';
import ParticipantsHeader from './participants-header';
import ParticipantsHeaderSkeleton from './participants-header.skeleton';
import { useConversations } from '~/messages/models/hooks/use-conversations';

type ParticipantsContainerProps = { id: string };

const ParticipantsContainer = (props: ParticipantsContainerProps) => {
  const navigate = useNavigate();
  const [authState] = useAuth();
  const [state] = useConversations();
  const conversation = () => state.conversations.find((i) => i.conversationId === props.id);

  const { loggedInUsers } = useSocket();

  const onBackClick = () => {
    navigate('/messages', { replace: true });
  };

  return (
    <Show when={!!conversation() && conversation()?.state !== 'pending'} fallback={<ParticipantsHeaderSkeleton />}>
      <ParticipantsHeader
        onBackClick={onBackClick}
        loggedInUsers={loggedInUsers()}
        conversation={conversation()}
        currentUser={authState.user}
      />
    </Show>
  );
};

export default ParticipantsContainer;
