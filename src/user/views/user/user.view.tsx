import { Title } from '@solidjs/meta';
import { Match, Switch } from 'solid-js';
import { UserHeaderContainer } from '~/user/components/user-header';
import { UserResponse } from '~/user/models/services/generated/user.client';

type UserViewProps = {
  id: string;
  user: UserResponse | undefined;
};

const UserView = (props: UserViewProps) => (
  <Switch fallback={<div>Laddar</div>}>
    <Match when={!props.user}>
      <div>Laddar</div>
    </Match>
    <Match when={!!props.user}>
      <Title>
        {props.user?.firstName} {props.user?.lastName}
      </Title>
      <UserHeaderContainer user={props.user as UserResponse} />x
    </Match>
  </Switch>
);

export default UserView;
