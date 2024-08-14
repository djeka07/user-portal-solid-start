import { css } from '~/app/helpers/class';
import { WrapperVariants, root, toolTip, wrapper } from './user-badge.css';
import { Show } from 'solid-js';

type UserBadgeProps = WrapperVariants & {
  user: { firstName: string; lastName: string };
  class?: string;
  text?: string;
};

const UserBadge = (props: UserBadgeProps) => (
  <span class={root}>
    <span class={css(props.class, wrapper({ size: props.size }))}>
      <span>{props?.user?.firstName?.[0]}</span>
      <span>{props?.user?.lastName?.[0]}</span>
    </span>
    <Show when={!!props.text}>
      <span class={toolTip}>{props.text}</span>
    </Show>
  </span>
);

export default UserBadge;
