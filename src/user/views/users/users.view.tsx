import { Typography } from '~/app/components/typographies';
import { NoAccessUsersContainer } from '~/user/components/no-access-users';

import { root, grid } from './users.css';
import { CreateUserItem } from '~/user/components/create-user-item';

const UsersView = () => {
  return (
    <div class={root}>
      <Typography variant="h1">Users</Typography>
      <div class={grid}>
        <NoAccessUsersContainer />
        <CreateUserItem />
      </div>
    </div>
  );
};

export default UsersView;
