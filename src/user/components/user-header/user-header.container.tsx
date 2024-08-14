import { useAuth } from '~/auth/models/hooks/use-auth';
import { UserResponse } from '~/user/models/services/generated/user.client';
import UserHeader from './user-header';

type UserHeaderContainerProps = {
  user: UserResponse;
};

const UserHeaderContainer = (props: UserHeaderContainerProps) => {
  const [state, { isAdmin }] = useAuth();
  return <UserHeader user={props.user} isAdmin={isAdmin()} isCurrentUser={state.user?.id === props?.user?.id} />;
};

export default UserHeaderContainer;
