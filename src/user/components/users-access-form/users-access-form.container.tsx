import { createResource } from 'solid-js';
import { updateAccessUsersAction } from '~/user/models/actions/update-user';
import fetchApplications from '~/user/models/server/fetch-applications';
import fetchUsers from '~/user/models/server/fetch-users';
import UserAccessForm from './users-access-form';

const UserAccessFormContainer = () => {
  const [data, { refetch }] = createResource(() => fetchUsers(1, 100, false));
  const [appData] = createResource(() => fetchApplications(1, 100));

  const onSuccess = () => refetch();

  return <UserAccessForm defaultAction={updateAccessUsersAction} data={data} appData={appData} onSuccess={onSuccess} />;
};

export default UserAccessFormContainer;
