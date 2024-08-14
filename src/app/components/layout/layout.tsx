import { Component, JSXElement, Show } from 'solid-js';
import { AuthRefreshContainer } from '~/auth/components/auth-refresh';
import { AuthProvider } from '~/auth/models/contexts/auth.context';
import { NotificationsContainer } from '~/notifications/components/notifications';
import { UserResponse, RoleResponse } from '~/user/models/services/generated/user.client';

import { Authorization } from '../../helpers/token';
import { SocketProvider } from '../../models/contexts/socket.context';
import { Navigation } from '../navigation';
import { main } from './layout.css';
import isAdministator from '~/auth/models/helpers/is-administator';
import { PanelsRendererContainer } from '../panels';

type AuthLayoutProps = {
  user: UserResponse;
  token: Authorization;
  roles: RoleResponse[];
  children: JSXElement;
};

const Layout: Component<AuthLayoutProps> = (props) => (
  <AuthProvider initialUser={props.user} initialToken={props.token} initialRoles={props.roles}>
    <Show when={import.meta.env.VITE_AUTH_REFRESH_ACTIVE === 'true'}>
      <AuthRefreshContainer />
    </Show>
    <Navigation currentUser={props.user} isAdmin={isAdministator(props.user, props.roles)} />
    <SocketProvider user={props.user} token={props.token}>
      <>
        <NotificationsContainer />
        <main class={main}>{props.children}</main>
        <PanelsRendererContainer />
      </>
    </SocketProvider>
  </AuthProvider>
);

export default Layout;
