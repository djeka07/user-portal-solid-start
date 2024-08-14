import { onCleanup, onMount } from 'solid-js';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '~/app/models/hooks/use-socket';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { MessageReponse } from '~/messages/models/services/generated/message.client';
import { notifications, setNotifications } from '~/notifications/models/notification.state';
import { NotificationEvent, UserResponse } from '~/notifications/models/services/generated/notification.client';
import Notifications from './notifications';
import { useLocation } from '@solidjs/router';

const NotificationsContainer = () => {
  const { socket } = useSocket();
  const location = useLocation();
  const [authState] = useAuth();

  const onUserLogin = (user: UserResponse) => {
    if (user.userId !== authState.user?.id) {
      const id = uuidv4();
      setNotifications((prev) => [...prev, { id, type: NotificationEvent.USER_LOGGED_IN, data: user }]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((p) => p.id !== id));
      }, 3000);
    }
  };

  const onMessage = (message: MessageReponse) => {
    const id = uuidv4();
    const isOnMessagePage = () => location.pathname.includes('messages');
    if (!isOnMessagePage) {
      setNotifications((prev) => [...prev, { id, type: NotificationEvent.MESSAGE, data: message }]);
    }
  };

  onMount(() => {
    socket()?.on(NotificationEvent.USER_LOGGED_IN, onUserLogin);
    socket()?.on(NotificationEvent.MESSAGE, onMessage);
  });

  onCleanup(() => {
    socket()?.off(NotificationEvent.USER_LOGGED_IN, onUserLogin);
    socket()?.off(NotificationEvent.MESSAGE, onMessage);
  });

  const onDelete = (id: string) => {
    setNotifications((prev) => prev.filter((p) => p.id !== id));
  };

  return <Notifications notifications={notifications()} onDelete={onDelete} />;
};

export default NotificationsContainer;
