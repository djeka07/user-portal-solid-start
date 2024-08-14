import { JSX, Show } from 'solid-js';
import { useAuth } from '~/auth/models/hooks/use-auth';

type AdminContainerProps = {
  children: JSX.Element;
};

const AdminContainer = (props: AdminContainerProps) => {
  const [, { isAdmin }] = useAuth();

  return <Show when={isAdmin()}>{props.children}</Show>;
};

export default AdminContainer;
