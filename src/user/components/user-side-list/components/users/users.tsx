import { For } from 'solid-js';
import { SessionInformation } from '~/app/models/types/user.session';
import { UserResponse } from '~/user/models/services/generated/user.client';

import { UserBadge } from '~/app/components/badges';
import { Icon } from '~/app/components/icons';
import Link from '~/app/components/links/link';
import { icon, name, numberOfUsers, userItem, users } from './users.css';
import { useI18n } from '~/app/models/contexts/i18n.context';

export interface UsersSideList extends UserResponse, SessionInformation {}

type UsersProps = {
  users: UsersSideList[];
  selectedUserId?: string;
  total: number;
};

const Users = (props: UsersProps) => {
  const [{ t }] = useI18n();
  return (
    <>
      <div class={users}>
        <For each={props.users}>
          {(user) => (
            <Link
              href={`/users/${user.id}`}
              class={userItem({
                selected: props.selectedUserId === user.id,
                online: user.online,
              })}
            >
              <UserBadge user={user} />
              <span class={name}>{user.firstName}</span> <span class={name}>{user.lastName}</span>
              {!user.hasGrantedAccess && <Icon class={icon} name="Slash" color="menu" />}
            </Link>
          )}
        </For>
      </div>
      <div class={numberOfUsers}>{t('users.users-list.number-of-users', { count: props.total })}</div>
    </>
  );
};

export default Users;
