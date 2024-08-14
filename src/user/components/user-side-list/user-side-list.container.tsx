import { createSignal, onMount } from 'solid-js';

import { useParams } from '@solidjs/router';
import { ProgressState } from '~/app/models/types/fetch.state';
import { UsersResponse } from '~/user/models/services/generated/user.client';
import { useSocket } from '../../../app/models/hooks/use-socket';
import UserList from './user-side-list';
import fetchUsers from '~/user/models/server/fetch-users';

const UserSideListContainer = () => {
  const params = useParams();
  const { loggedInUsers } = useSocket();
  const [page] = createSignal(1);
  const [state, setState] = createSignal<ProgressState<UsersResponse>>({ state: 'pending' });

  const fetch = async () => {
    try {
      setState((prev) => ({ ...prev, state: page() === 1 ? 'pending' : 'repending' }));
      const users = await fetchUsers(page(), 20);
      setState((prev) => ({ ...prev, data: users, state: 'ready' }));
      return users;
    } catch {
      setState((prev) => ({ ...prev, error: 'Could not fetch users', state: 'errored' }));
    }
  };

  onMount(async () => {
    await fetch();
  });

  return <UserList loggedInUsers={loggedInUsers()} selectedUserId={params.id} state={state()} />;
};

export default UserSideListContainer;
