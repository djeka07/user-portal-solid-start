import { useSocket } from '~/app/models/hooks/use-socket';
import { useAuth } from '~/auth/models/hooks/use-auth';

import Chat from './chat';

const ChatContainer = () => {
  const [state] = useAuth();
  const { loggedInUsers } = useSocket();
  return <Chat loggedInUsers={loggedInUsers()} user={state.user} token={state.token} />;
};

export default ChatContainer;
