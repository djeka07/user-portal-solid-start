/* eslint-disable solid/reactivity */
import { Match, Show, Switch, createMemo, createSignal } from 'solid-js';
import { Icon } from '~/app/components/icons';
import { Error, Skeleton } from '~/app/components/lists';
import { Typography } from '~/app/components/typographies';
import { SessionInformation } from '~/app/models/types/user.session';
import { UsersResponse } from '~/user/models/services/generated/user.client';

import { ProgressState } from '../../../app/models/types/fetch.state';
import { Users } from './components/users';
import { headingWrapper, panelContent, svg } from './user-side-list.css';
import { AdminContainer } from '~/auth/components/admin';
import { PanelContainer, PanelContent } from '~/app/components/panels';
import { CreateUserFormContainer } from '../create-user-form';
import { PanelSize } from '~/app/components/panels/panel.type';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { sortBy } from '~/app/helpers/array';
import { UsersSideList } from './components/users/users';

type UserListProps = {
  loggedInUsers: SessionInformation[];
  selectedUserId?: string;
  state: ProgressState<UsersResponse>;
};

const UserSideList = (props: UserListProps) => {
  const [show, setShow] = createSignal(false);
  const [{ t }] = useI18n();
  const users = createMemo(() =>
    sortBy<UsersSideList>(
      (props.state?.data?.users || []).map((u) => {
        const loggedInUser = props.loggedInUsers?.find((l) => l.user?.userId === u.id);
        return {
          ...u,
          ...(loggedInUser || { online: false }),
        };
      }),
      'online',
    ),
  );

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const onCreateUserSuccess = (closePanel: () => void): void => {
    setTimeout(() => {
      closePanel();
    }, 500);
  };

  return (
    <>
      <div class={headingWrapper}>
        <Typography transform="capitalize" variant="h4">
          {t('users.users-view.users')}
        </Typography>
        <AdminContainer>
          <Icon onClick={toggleShow} class={svg} name="Plus" />
          <Show when={show()}>
            <PanelContainer
              panelElementProps={{ maxWidth: PanelSize.Xsmall, closeOnEscape: true, showCloseButton: true }}
              afterPanelClosed={() => setShow(false)}
            >
              {(props) => (
                <PanelContent class={panelContent}>
                  <CreateUserFormContainer
                    onCancel={() => props.closePanel()}
                    onSuccess={() => onCreateUserSuccess(props.closePanel)}
                  />
                </PanelContent>
              )}
            </PanelContainer>
          </Show>
        </AdminContainer>
      </div>
      <Switch>
        <Match when={props.state.state === 'pending'}>
          <Skeleton amount={10} />
        </Match>
        <Match when={props.state.state === 'errored'}>
          <Error message="Could not fetch users" />
        </Match>
        <Match when={props.state.state === 'ready'}>
          <Users selectedUserId={props.selectedUserId} users={users() || []} total={props.state?.data?.total || 0} />
        </Match>
      </Switch>
    </>
  );
};

export default UserSideList;
