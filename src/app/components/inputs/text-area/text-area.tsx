import { Show, createSignal, mergeProps } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import { css } from '~/app/helpers/class';
import { isBackSpace, isEnterWithShift, isEnterWithoutShift } from '../../../helpers/keyboard';
import { Icon } from '../../icons';
import { getHeight } from './get-height';
import { InputVariants, WrapperVariants, error, errorSvg, input, label, wrapper } from './text-area.css';

type TextAreaProps = WrapperVariants &
  InputVariants & {
    type: string;
    name: string;
    id?: string;
    value?: string;
    maxHeight?: number;
    boxShadow?: boolean;
    autoComplete?: string;
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
    onEnterWithoutShift?: (event: KeyboardEvent) => void;
    label?: string;
    placeholder?: string;
    class?: string;
    error?: string;
  };

const defaultProps = { maxHeight: 100, boxShadow: true } as Partial<TextAreaProps>;

const TextArea = (props: TextAreaProps) => {
  const mergedProps = mergeProps(defaultProps, props);
  let errorRef: HTMLDivElement | undefined;
  let ref: HTMLTextAreaElement | undefined;
  const [height, setHeight] = createSignal<number>(42);

  const onKeyDown = (event: KeyboardEvent) => {
    if (isEnterWithoutShift(event) && props.onEnterWithoutShift) {
      event.preventDefault();
      props.onEnterWithoutShift(event);
      setTimeout(() => {
        setHeight(42);
        if (ref) {
          ref.rows = 1;
        }
      }, 0);
    } else if (isBackSpace(event)) {
      const lastRow = ref?.value.split('\n')?.at(-1);
      if (!lastRow) {
        setHeight((prev) => (prev <= 42 || prev - 14 <= 42 ? 42 : prev - 14));
      }
    } else if (isEnterWithShift(event)) {
      if (ref) {
        setHeight(42);
        ref.rows += 1;
        setHeight(() => getHeight(ref?.scrollHeight as number, mergedProps.maxHeight as number));
      }
    }
  };

  const onInput = (event: InputEvent) => {
    event.preventDefault();

    if (mergedProps.onChange) {
      mergedProps.onChange(event);
    }
  };

  return (
    <div class={wrapper({ width: mergedProps.width })}>
      <Show when={mergedProps.label}>
        <label class={label} for={mergedProps.id || mergedProps.name}>
          {mergedProps.label}
        </label>
      </Show>
      <textarea
        ref={ref}
        rows={1}
        value={props.value || ''}
        style={{ height: `${height()}px` }}
        autocomplete={mergedProps.autoComplete}
        id={mergedProps.id || mergedProps.name}
        placeholder={mergedProps.placeholder}
        onKeyDown={(event) => onKeyDown(event)}
        onInput={(event) => onInput(event)}
        name={mergedProps.name}
        class={css(
          input({
            errored: !!mergedProps.error || mergedProps.errored,
            radius: mergedProps.radius,
            boxShadow: props.boxShadow,
          }),
          mergedProps.class,
        )}
      />
      <Presence>
        <Show when={mergedProps.error}>
          <Motion
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: `${errorRef?.clientHeight}px` }}
            exit={{ opacity: 0, height: '0px' }}
          >
            <div class={error} ref={errorRef}>
              <Icon name="AlertCircle" class={errorSvg} size="small" />
              {mergedProps.error}
            </div>
          </Motion>
        </Show>
      </Presence>
    </div>
  );
};

export default TextArea;
