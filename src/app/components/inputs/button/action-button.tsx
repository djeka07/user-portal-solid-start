import Button, { ButtonProps } from './button';
import { css } from '../../../helpers/class';
import { actionButton, root, typography } from './action-button.css';
import { Show } from 'solid-js';
import { Typography } from '../../typographies';
import Icon, { IconProps } from '../../icons/icon';

type ActionButtonProps = Pick<ButtonProps, 'children' | 'class' | 'disabled' | 'isLoading' | 'onClick'> & {
  description?: string;
  iconName?: IconProps['name'];
};

const ActionButton = (props: ActionButtonProps) => (
  <Button
    color={'transparent'}
    wide
    class={css(props.class, actionButton)}
    onClick={props.onClick}
    isLoading={props.isLoading}
    disabled={props.disabled}
  >
    <span class={root}>
      <Show when={!!props.iconName}>
        <Icon name={props.iconName!} background="white" />
      </Show>
      <Typography as="span" color="grey600">
        {props.children}
      </Typography>
      <Show when={props.description}>
        <Typography class={typography} fontStyle="italic" size="small" color="grey600" as="span">
          {props.description}
        </Typography>
      </Show>
    </span>
  </Button>
);

export default ActionButton;
