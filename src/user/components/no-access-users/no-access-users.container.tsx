import { createSignal, onMount, Show } from 'solid-js';
import { useAuth } from '../../../auth/models/hooks/use-auth';
import { ProgressState } from '../../../app/models/types/fetch.state';
import { UsersResponse } from '~/user/models/services/generated/user.client';
import NoAccessUsers from './no-access-users';
import fetchUsers from '~/user/models/server/fetch-users';

const NotGrantedUsersContainer = () => {
  const [, { isAdmin }] = useAuth();
  const [progress, setProgress] = createSignal<ProgressState<UsersResponse>>({ state: 'initial' });

  const fetchData = async () => {
    try {
      setProgress((prev) => ({ ...prev, state: 'pending' }));
      const response = await fetchUsers(1, 1, false);
      setProgress((prev) => ({ ...prev, state: 'ready', data: response }));
    } catch (error) {
      setProgress((prev) => ({ ...prev, state: 'errored', error }));
    }
  };

  onMount(async () => {
    if (isAdmin()) {
      await fetchData();
    }
  });

  return (
    <Show when={isAdmin()}>
      <NoAccessUsers state={progress()} />
    </Show>
  );
};

export default NotGrantedUsersContainer;
