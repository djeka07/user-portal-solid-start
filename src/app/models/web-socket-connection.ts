import ioClient, { Socket } from 'socket.io-client';
import { UserResponse } from '../../user/models/services/generated/user.client';
const ENDPOINT = import.meta.env.VITE_SOCKET;
const path = import.meta.env.VITE_SOCKET_PATH;
const isDevelopment = import.meta.env.DEV;

export const connectToClient = (auth: string, user: UserResponse, sessionId?: string): Socket => {
  const socket = ioClient(ENDPOINT, {
    path,
    secure: !isDevelopment,
    auth: {
      authorization: auth,
      username: user?.username,
      id: user?.id,
      name: `${user?.firstName} ${user?.lastName}`,
      sessionId,
    },
    transports: ['websocket', 'polling'],
  });
  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err}`);
  });
  return socket;
};
