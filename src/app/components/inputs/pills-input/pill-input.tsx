/* eslint-disable solid/reactivity */
import { createSignal, For, mergeProps, Show } from 'solid-js';
import { isEmpty } from '~/app/helpers/array';
import { css } from '~/app/helpers/class';

import { Motion, Presence } from 'solid-motionone';
import { Icon } from '../../icons';
import {
  error,
  errorSvg,
  input,
  InputVariants,
  inputWrapper,
  label,
  pill,
  wrapper,
  WrapperVariants,
} from './pill-input.css';

export type TextEvent = InputEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
};

export type TextClickEvent = MouseEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
};

export type TextFocusEvent = FocusEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
};

type Pill = {
  id: string;
  label: string;
};

type TextInputProps = WrapperVariants &
  InputVariants & {
    pills?: Pill[];
    type: string;
    name: string;
    ref?: HTMLInputElement;
    value?: string;
    id?: string;
    autoComplete?: string;
    onClick?: (event: TextClickEvent) => void;
    onChange?: (event: TextEvent) => void;
    onBlur?: (event: TextFocusEvent) => void;
    onFocus?: (event: TextFocusEvent) => void;
    onDeletePill?: (id: string) => void;
    label?: string;
    isFocused?: boolean;
    placeholder?: string;
    wrapperClass?: string;
    class?: string;
    error?: string;
  };

const PillInput = (props: TextInputProps) => {
  const merged = mergeProps({ pills: [], isFocused: false }, props);
  const [value, setValue] = createSignal(merged.value);

  const onFocus = (e: TextFocusEvent) => {
    if (merged.onFocus) {
      merged.onFocus(e);
    }
  };

  const onBlur = (e: TextFocusEvent) => {
    if (merged.onBlur) {
      merged.onBlur(e);
    }
  };

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Backspace' && value() === '' && !isEmpty(merged.pills)) {
      merged.onDeletePill?.(merged.pills[merged.pills.length - 1]?.id);
    }
  };

  const onInput = (e: TextEvent) => {
    const { value } = e.currentTarget;
    setValue(value);
    merged.onChange?.(e);
  };

  return (
    <div class={css(merged.wrapperClass, wrapper({ width: merged.width }))}>
      <Show when={merged.label}>
        <label class={label} for={merged.id || merged.name}>
          {merged.label}
        </label>
      </Show>
      <div class={inputWrapper({ radius: merged.radius })}>
        <Show when={merged.pills}>
          <For each={merged.pills}>
            {(p) => (
              <span onClick={() => merged.onDeletePill?.(p.id)} class={pill}>
                {p.label} <Icon size="small" color="grey" name="Close" />
              </span>
            )}
          </For>
        </Show>
        <input
          ref={merged.ref}
          onClick={(e) => merged.onClick?.(e)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyPress}
          autocomplete={merged.autoComplete}
          id={merged.id || merged.name}
          placeholder={merged.placeholder}
          value={merged.value || ''}
          onInput={onInput}
          name={merged.name}
          type={merged.type}
          class={css(input, merged.class || '')}
        />
      </div>
      <Presence>
        <Show when={merged.error}>
          <Motion
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: '30px' }}
            exit={{ opacity: 0, height: '0px' }}
          >
            <div class={error}>
              <Icon name="AlertCircle" class={errorSvg} size="small" />
              {merged.error}
            </div>
          </Motion>
        </Show>
      </Presence>
    </div>
  );
};

export default PillInput;
