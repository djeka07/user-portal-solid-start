import { Component, JSXElement, mergeProps, Show } from 'solid-js';

import { Spinner } from '../../spinners';
import { button, ButtonVariants, children, ChildrenVariants } from './button.css';
import { css } from '~/app/helpers/class';

export type ButtonProps = ButtonVariants &
  ChildrenVariants & {
    type?: 'submit' | 'button' | 'reset';
    round?: boolean;
    wide?: boolean;
    fullWidthMobile?: boolean;
    onClick?: (event: Event) => void;
    disabled?: boolean;
    isLoading?: boolean;
    children: JSXElement;
    class?: string;
    innerClass?: string;
  };

const defaultProps = {
  type: 'button',
  onClick: undefined,
  size: 'medium',
  isLoading: false,
  fullWidthMobile: true,
  disabled: false,
  wide: false,
  round: false,
} as Partial<ButtonProps>;

const Button: Component<ButtonProps> = (props) => {
  const merged = mergeProps(defaultProps, props);

  const onClick = (e: Event) => {
    if (merged.onClick) {
      merged.onClick(e);
    }
  };
  return (
    <button
      disabled={merged.disabled}
      onClick={onClick}
      class={css(
        button({
          color: merged.color,
          fullWidthMobile: merged.fullWidthMobile,
          wide: merged.wide,
          round: merged?.round,
          disabled: merged.disabled,
        }),
        props.class,
      )}
      type={merged.type}
    >
      <Show when={!props.isLoading} fallback={<Spinner />}>
        <span tabIndex={-1} class={css(children({ size: merged.size, color: merged.color }), props.innerClass)}>
          {merged.children}
        </span>
      </Show>
    </button>
  );
};

export default Button;
