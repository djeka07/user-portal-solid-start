import { For } from 'solid-js';
import { badge, badgeWrapper } from './user-badges.css';
import { UserBadge } from '~/app/components/badges';
import { css } from '~/app/helpers/class';

type UserBadgesProps = {
  items: { firstName: string; lastName: string }[];
  class?: string;
};

const UserBadges = (props: UserBadgesProps) => (
  <span class={css(props.class, badgeWrapper)}>
    <For each={props.items}>
      {(user, index) => (
        <UserBadge class={badge({ isMultiple: props.items?.length > 1, isSecond: index() >= 1 })} user={user} />
      )}
    </For>
  </span>
);

export default UserBadges;
