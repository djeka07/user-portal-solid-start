import { createSignal, mergeProps, onMount, Setter, Show } from 'solid-js';
import { css } from '~/app/helpers/class';

import { Motion, Presence } from 'solid-motionone';
import { Icon } from '../../icons';
import {
  error,
  errorSvg,
  fieldset,
  input,
  InputVariants,
  label,
  legend,
  legentSpan,
  root,
  wrapper,
} from './text-input.css';

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

type TextInputProps = InputVariants & {
  type: string;
  name: string;
  ref?: Setter<HTMLInputElement | null>;
  value?: string;
  full?: boolean;
  id?: string;
  autoComplete?: string;
  onClick?: (event: TextClickEvent) => void;
  onChange?: (event: TextEvent) => void;
  onBlur?: (event: TextFocusEvent) => void;
  onFocus?: (event: TextFocusEvent) => void;
  label?: string;
  placeholder?: string;
  class?: string;
  error?: string | undefined;
};

const defaultProps = { full: true } as Partial<TextInputProps>;

const TextInput = (props: TextInputProps) => {
  const [focus, setFocus] = createSignal(false);
  const [autoFocus, setAutoFocus] = createSignal(false);
  const merged = mergeProps(defaultProps, props);
  let errorRef: HTMLDivElement | undefined;
  let inputRef: HTMLInputElement | undefined;

  const onFocus = (e: TextFocusEvent) => {
    setFocus(true);
    if (merged.onFocus) {
      merged.onFocus(e);
    }
  };

  const onBlur = (e: TextFocusEvent) => {
    setFocus(false);
    if (merged.onBlur) {
      merged.onBlur(e);
    }
  };

  const checkIfAutoFocus = () => {
    try {
      if (inputRef?.matches(':autofill')) {
        setAutoFocus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  onMount(() => {
    checkIfAutoFocus();
  });

  return (
    <div class={root({ width: merged.full ? 'full' : undefined })} ref={props.ref}>
      <div class={wrapper({ width: merged.full ? 'full' : undefined })}>
        <Show when={merged.label}>
          <label
            class={label({
              float: focus() || !!inputRef?.value || autoFocus() || !!props.value,
              focus: focus() && !merged.error,
              errored: focus() && !!merged.error,
            })}
            for={merged.id || merged.name}
          >
            {merged.label}
          </label>
        </Show>
        <input
          ref={inputRef}
          onClick={(e) => merged.onClick?.(e)}
          onFocus={onFocus}
          onBlur={onBlur}
          autocomplete={merged.autoComplete}
          id={merged.id || merged.name}
          placeholder={focus() ? merged.placeholder : undefined}
          value={merged.value || ''}
          onInput={(e) => merged.onChange?.(e)}
          name={merged.name}
          type={merged.type}
          class={css(input, merged.class || '')}
        />
        <Show when={merged.label}>
          <fieldset
            class={fieldset({ focus: focus(), errored: !!merged.error, errorFocus: focus() && !!merged.error })}
          >
            <legend class={legend({ focus: focus() || !!inputRef?.value || autoFocus() || !!props.value })}>
              <span class={legentSpan}>{merged.label}</span>
            </legend>
          </fieldset>
        </Show>
      </div>
      <Presence>
        <Show when={merged.error}>
          <Motion
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: `${errorRef?.clientHeight}px` }}
            exit={{ opacity: 0, height: '0px' }}
          >
            <div class={error({ radius: merged.radius })} ref={errorRef}>
              <Icon name="AlertCircle" class={errorSvg} size="small" />
              {merged.error}
            </div>
          </Motion>
        </Show>
      </Presence>
    </div>
  );
};

export default TextInput;
