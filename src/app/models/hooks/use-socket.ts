import { useContext } from 'solid-js';
import { SocketState, SocketContext } from '../contexts/socket.context';

export const useSocket = (): SocketState => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
