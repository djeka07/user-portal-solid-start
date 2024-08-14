import { UserView } from '~/user/views';

import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import fetchUserById from '~/user/models/server/fetch-user-by-id';

export const route = {
  load: ({ params }) => fetchUserById(params.id),
} satisfies RouteDefinition<any>;

export default (props: RouteSectionProps) => {
  const id = () => props.params.id;
  const data = createAsync(() => fetchUserById(id()));
  return <UserView id={id()} user={data()} />;
};
