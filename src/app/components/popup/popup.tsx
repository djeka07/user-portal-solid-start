import createFocusTrap from 'solid-focus-trap';
import { JSXElement, Setter, Show, createSignal, mergeProps } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import { clickOutside } from '~/app/directives/on-click-outside';
import { css } from '~/app/helpers/class';
import { ContentVariants, content, root } from './popup.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const d = clickOutside;

type RenderButtonProps = {
  onClick: (e: Event) => void;
  isFocused?: boolean;
  ref: Setter<HTMLElement | null>;
};

type ChildrenProps = {
  close: () => void;
};

type PopupProps = ContentVariants & {
  renderButton: (props: RenderButtonProps) => JSXElement;
  children: JSXElement | JSXElement[] | ((props: ChildrenProps) => JSXElement);
  class?: string;
  rootClass?: string;
  marginFromTop?: number;
};

const Popup = (props: PopupProps) => {
  const merged = mergeProps({ marginFromTop: 0 }, props);
  let rootRef: HTMLDivElement | undefined;
  const [contentRef, setContentRef] = createSignal<HTMLElement | null>(null);
  const [isFocused, setIsFocused] = createSignal(false);
  const close = () => setIsFocused(false);

  const onClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused((prev) => !prev);
  };

  createFocusTrap({
    element: contentRef,
    enabled: () => isFocused(),
  });

  return (
    <div ref={rootRef} class={css(merged.rootClass, root)}>
      {merged.renderButton({ isFocused: isFocused(), onClick, ref: setContentRef })}
      <Presence>
        <Show when={isFocused()}>
          <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div
              style={{ top: `${(rootRef?.clientHeight || 0) + merged.marginFromTop}px` }}
              use:clickOutside={() => setIsFocused(false)}
              class={css(merged.class, content({ background: merged.background }))}
            >
              {typeof merged.children === 'function'
                ? (merged.children as (props: ChildrenProps) => JSXElement)?.({ close })
                : (merged.children as JSXElement | JSXElement[])}
            </div>
          </Motion>
        </Show>
      </Presence>
    </div>
  );
};

export default Popup;
