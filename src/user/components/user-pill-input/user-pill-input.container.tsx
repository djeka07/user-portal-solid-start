import { createSignal } from 'solid-js';
import { ProgressState } from '~/app/models/types/fetch.state';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { UserResponse, UsersResponse } from '~/user/models/services/generated/user.client';
import { searchUsers } from '~/user/models/services/user.service';
import UserPillInput from './user-pill-input';

type UserPillInputContainerProps = {
  selectedUsers: UserResponse[];
  onDeleteUser: (id: string) => Promise<void>;
  onSelectUser: (user: UserResponse) => Promise<void>;
};

const UserPillInputContainer = (props: UserPillInputContainerProps) => {
  const [authState] = useAuth();

  const [state, setState] = createSignal<ProgressState<UsersResponse>>({ state: 'initial' });

  const onInputChange = async (value: string) => {
    try {
      setState((prev) => ({ ...prev, state: 'pending' }));
      const response = await searchUsers({
        accessToken: authState.token?.accessToken,
        page: 1,
        take: 10,
        query: value,
        url: import.meta.env.VITE_USER_API,
      });
      setState((prev) => ({ ...prev, state: 'ready', data: response }));
    } catch (error) {
      setState((prev) => ({ ...prev, state: 'errored', error }));
    }
  };

  const onDeletePill = (id: string) => {
    props.onDeleteUser(id);
  };

  const onUserClick = async (user: UserResponse) => {
    props.onSelectUser(user);
    setState({ state: 'initial' });
  };

  return (
    <UserPillInput
      onDelete={onDeletePill}
      onInputChange={onInputChange}
      onUserClick={onUserClick}
      pills={props.selectedUsers.map((u) => ({ id: u.id, label: `${u.firstName} ${u.lastName}` }))}
      state={state()}
    />
  );
};

export default UserPillInputContainer;
