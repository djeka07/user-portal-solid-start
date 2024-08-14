import { JSXElement, createContext, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Authorization } from '~/app/helpers/token';
import { RoleResponse, UserResponse } from '~/user/models/services/generated/user.client';
import isAdministator from '../helpers/is-administator';

export type AuthProviderProps = {
  initialToken: Authorization;
  initialUser: UserResponse;
  initialRoles: RoleResponse[];
  children: JSXElement;
};

export type AuthState = {
  token: Authorization;
  user: UserResponse;
  roles: RoleResponse[];
};

export type AuthContextActions = {
  updateToken: (token: Authorization) => void;
  isAdmin: () => boolean;
};

export type AuthContextType = [AuthState, AuthContextActions];

export const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: AuthProviderProps) {
  const [state, setState] = createStore({
    token: props.initialToken,
    user: props.initialUser,
    roles: props.initialRoles,
  });

  createEffect(() => {
    setState({ token: props.initialToken, user: props.initialUser, roles: props.initialRoles });
  });

  const context: AuthContextType = [
    state,
    {
      updateToken: (token: Authorization) => {
        setState({ token });
      },
      isAdmin: () => isAdministator(state.user, state.roles),
    },
  ];

  return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>;
}
