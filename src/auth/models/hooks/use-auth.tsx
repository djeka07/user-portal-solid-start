import { useContext } from 'solid-js';
import { AuthContext, AuthContextType } from '../contexts/auth.context';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
