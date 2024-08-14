/* eslint-disable solid/reactivity */
import { createContext, JSXElement, createSignal, Accessor, onMount, onCleanup } from 'solid-js';
import { UserResponse } from '~/user/models/services/generated/user.client';
import { Authorization } from '~/app/helpers/token';
import { Socket } from 'socket.io-client';
import { connectToClient } from '../web-socket-connection';
import { Dayjs } from 'dayjs';
import { useLocaleStorage } from '../hooks/use-locale-storage';
import { SessionInformation } from '../types/user.session';
import { SocketEvent } from '~/notifications/models/services/generated/notification.client';

export type SocketProviderProps = {
  token: Authorization;
  user: UserResponse;
  children: JSXElement;
};

export type ChatUser = {
  id: string;
  userId: string;
  username: string;
  name: string;
  online: Dayjs;
};

export type SocketState = {
  socket: Accessor<Socket>;
  loggedInUsers: Accessor<SessionInformation[]>;
};

export const SocketContext = createContext<Omit<SocketState, 'children'>>(undefined, {});

export function SocketProvider(props: SocketProviderProps) {
  const { getItem, setItem } = useLocaleStorage<string>();
  const [socket, setSocket] = createSignal<Socket>();
  const [loggedInUsers, setLoggedInUsers] = createSignal<SessionInformation[]>([]);

  onMount(() => {
    const sessionId = getItem('sessionId');
    const connctedIo = connectToClient(props.token?.accessToken as string, props.user, sessionId);

    connctedIo?.on(SocketEvent.SESSION_CONNECTED, ({ sessionId }) => {
      setItem('sessionId', sessionId);
    });

    setSocket(connctedIo);

    connctedIo?.on(SocketEvent.USERS, (users: SessionInformation[]) => {
      setLoggedInUsers(users);
    });

    connctedIo.on(SocketEvent.MESSAGE_CREATED, (props) => {
      console.log(props);
    });

    connctedIo?.on(SocketEvent.USER_DISCONNECTED, (userId: string) => {
      setLoggedInUsers((prev) => prev.filter((u) => u.user?.userId !== userId));
    });
  });

  onCleanup(() => {
    if (socket()) {
      socket()?.disconnect();
    }
  });

  return (
    <SocketContext.Provider value={{ socket: socket as Accessor<Socket>, loggedInUsers }}>
      {props.children}
    </SocketContext.Provider>
  );
}
