import { RouteSectionProps } from '@solidjs/router';
import { AsideLayout } from '~/app/components/layout';
import { UserSideListContainer } from '~/user/components/user-side-list';

export default (props: RouteSectionProps) => (
  <AsideLayout margin="small" title="Users" asideRender={<UserSideListContainer />}>
    {props.children}
  </AsideLayout>
);
