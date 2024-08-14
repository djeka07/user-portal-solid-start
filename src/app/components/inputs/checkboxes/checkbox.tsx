import { JSX, Show, createEffect, createSignal } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import { isSpace } from '~/app/helpers/keyboard';
import { css } from '../../../helpers/class';
import { Icon } from '../../icons';
import { InputVariants, children, error, errorSvg, input, label, root, wrapper } from './checkbox.css';

export type CheckboxProps = InputVariants & {
  value?: string;
  name?: string;
  label?: string;
  defaultChecked?: boolean;
  radius?: number;
  disabled?: boolean;
  propsToSendOnChange?: unknown;
  onChange?: (value: string, isChecked: boolean, props: unknown) => void;
  children?: JSX.Element;
  class?: string;
  error?: string;
  noErrorLabel?: boolean;
};

const Checkbox = (props: CheckboxProps) => {
  let errorRef: HTMLDivElement | undefined;
  const [isChecked, setIsChecked] = createSignal(props.defaultChecked);

  createEffect((prev) => {
    if (prev !== undefined && prev !== props.defaultChecked) {
      setIsChecked(props.defaultChecked);
    }
    return props.defaultChecked;
  });

  const toggleCheckboxChange = (e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }): void => {
    setIsChecked(e.currentTarget.checked);
  };

  createEffect((prev) => {
    if (prev !== isChecked() && props.onChange) {
      props.onChange(props.value as string, isChecked() as boolean, props.propsToSendOnChange);
    }
    return isChecked();
  });

  const onKeyPress = (e: KeyboardEvent) => {
    if (isSpace(e)) {
      setIsChecked((prev) => !prev);
    }
  };

  return (
    <div class={root}>
      <div class={css(props.class, wrapper({ disabled: props.disabled }))} id={props.label}>
        <input
          name={props.name}
          class={input({ error: !!props.error, radius: props.radius })}
          type="checkbox"
          value={props.value}
          checked={isChecked()}
          onChange={toggleCheckboxChange}
          disabled={props.disabled}
        />
        {props.label && (
          <span
            tabIndex={0}
            role="checkbox"
            aria-checked={isChecked()}
            onKeyDown={onKeyPress}
            class={label}
            onClick={() => setIsChecked((prev) => !prev)}
          >
            {props.label}
          </span>
        )}
        {props.children && <span class={children({ paddingLeft: !props.label })}>{props.children}</span>}
        <Show when={!props.noErrorLabel}>
          <Presence>
            <Show when={!!props.error}>
              <Motion
                initial={{ opacity: 0, height: '0px' }}
                animate={{ opacity: 1, height: `${errorRef?.clientHeight}px` }}
                exit={{ opacity: 0, height: '0px' }}
              >
                <div class={error({ radius: props.radius })} ref={errorRef}>
                  <Icon name="AlertCircle" class={errorSvg} size="small" />
                  {props.error}
                </div>
              </Motion>
            </Show>
          </Presence>
        </Show>
      </div>
    </div>
  );
};

export default Checkbox;
