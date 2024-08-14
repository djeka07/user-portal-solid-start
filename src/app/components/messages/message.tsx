import { Show, createSignal, mergeProps, onMount } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import { MessageVariants, innerMessage, message } from './message.css';
import { JSX } from 'solid-js/web/types/jsx.js';
import { css } from '../../helpers/class';

type MessageProps = MessageVariants & {
  children: JSX.Element;
  show?: boolean;
  wrapperClass?: string;
  margin?: { bottom?: number; top?: number; left?: number; right?: number };
  class?: string;
  onMount: (height: number) => void;
};

const defaultProps = { show: true, margin: { bottom: 0, top: 0, left: 0, right: 0 } } as Partial<MessageProps>;

const InnerMessage = (props: Omit<MessageProps, 'show'>) => {
  let ref: HTMLDivElement | undefined;

  onMount(() => {
    props.onMount(ref?.clientHeight || 0);
  });

  return (
    <div class={css(props.wrapperClass, message({ type: props.type }))}>
      <div class={css(props.class, innerMessage)} ref={ref}>
        {props.children}
      </div>
    </div>
  );
};

const Message = (props: Omit<MessageProps, 'onMount'>) => {
  const mergedProps = mergeProps(defaultProps, props);
  const [height, setHeight] = createSignal(0);

  return (
    <Presence>
      <Show when={mergedProps.show}>
        <Motion
          initial={{ opacity: 0, height: '0px', marginBottom: '0px' }}
          animate={{
            opacity: 1,
            height: `${height()}px`,
            marginBottom: props.margin?.bottom ? `${props.margin?.bottom}px` : undefined,
            marginTop: props.margin?.top ? `${props.margin?.top}px` : undefined,
            marginLeft: props.margin?.left ? `${props.margin?.left}px` : undefined,
            marginRight: props.margin?.right ? `${props.margin?.right}px` : undefined,
          }}
          exit={{ opacity: 0, height: '0px', marginBottom: '0px' }}
        >
          <InnerMessage
            wrapperClass={props.wrapperClass}
            class={props.class}
            onMount={(height) => setHeight(height)}
            type={mergedProps.type}
          >
            {mergedProps.children}
          </InnerMessage>
        </Motion>
      </Show>
    </Presence>
  );
};

export default Message;
