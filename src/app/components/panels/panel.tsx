import { JSX, Show, createEffect, createSignal, mergeProps, onCleanup, onMount } from 'solid-js';
import { OverlayElementProps, PanelAnimationDuration, PanelPosition, PanelProps, PanelSize } from './panel.type';
import { Motion, Presence } from 'solid-motionone';
import createFocusTrap from 'solid-focus-trap';
import { overlay, panelElement, clickOutside as clickOutsideClass, closeButton } from './panel.css';
import { getPanelHiddenVariants, getPanelVisibleVariants } from './get-panel-variants';
import { Icon } from '../icons';
import { isEscape } from '~/app/helpers/keyboard';

const PANEL_ANIMATION_DURATION: { [key: string]: PanelAnimationDuration } = {
  DEFAULT: { overlay: { in: 0.1, out: 0.1 }, panel: { in: 0.2, out: 0.15 } },
};

export type ExtendedPanelProps = PanelProps & {
  removePanelFromContext: () => void;
  lastInStack?: boolean;
  zIndex: number;
};

const defaultProps = {
  panelElementProps: {
    panelPosition: PanelPosition.Right,
    maxWidth: PanelSize.Medium,
    showCloseButton: false,
    closeOnEscape: true,
  },
  overlayElementProps: {
    shouldCloseOnClick: true,
  },
} as Partial<ExtendedPanelProps>;

const Panel = (props: ExtendedPanelProps): JSX.Element => {
  const animationDuration = PANEL_ANIMATION_DURATION.DEFAULT;
  const mergedProps = mergeProps(defaultProps, props);
  const [isActive, setIsActive] = createSignal<boolean>(true);
  const [contentRef, setContentRef] = createSignal<HTMLElement | null>(null);

  // eslint-disable-next-line solid/reactivity
  const { shouldCloseOnClick } = mergedProps.overlayElementProps as OverlayElementProps;
  let controller: AbortController;

  const closePanel = () => {
    setIsActive(false);
  };

  createEffect(() => {
    if (isActive()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  });

  const onClickOutside = (e: Event & { target: EventTarget | null }) => {
    if (!contentRef()?.contains(e.target as Node) && props.lastInStack) {
      setIsActive(false);
      controller.abort();
    }
  };

  createFocusTrap({
    element: contentRef,
    enabled: () => isActive(),
    initialFocusElement: props.initialFocusOnElement,
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (isEscape(event) && props.lastInStack) {
      setIsActive(false);
      controller.abort();
    }
  };

  onMount(() => {
    controller = new AbortController();
    if (shouldCloseOnClick) {
      document.body.addEventListener('click', onClickOutside, { signal: controller.signal });
    }
    if (mergedProps.panelElementProps?.closeOnEscape) {
      document.body.addEventListener('keydown', onKeyDown, { signal: controller.signal });
    }
  });

  onCleanup(() => {
    if (shouldCloseOnClick) {
      document.body.removeEventListener('click', onClickOutside);
    }
    if (mergedProps.panelElementProps?.closeOnEscape) {
      document.body.removeEventListener('keydown', onKeyDown);
    }
  });

  const onExit = () => {
    if (!isActive()) {
      mergedProps?.afterPanelClosed();
      mergedProps.removePanelFromContext();
    }
  };

  return (
    <Presence>
      <Show when={isActive()}>
        <Motion.div
          style={{ 'z-index': mergedProps.zIndex || 50 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: animationDuration.overlay.out, delay: 0.2 } }}
          transition={{ duration: animationDuration.overlay.in }}
          class={overlay({ panelPosition: mergedProps.panelElementProps?.panelPosition })}
          onMotionComplete={onExit}
        >
          <Motion.div
            role="dialog"
            aria-labelledby="panel"
            aria-modal="true"
            style={{ 'max-width': mergedProps.panelElementProps?.maxWidth || undefined }}
            class={panelElement({
              width: mergedProps.panelElementProps?.panelPosition,
              height: mergedProps.panelElementProps?.panelPosition,
            })}
            initial={getPanelHiddenVariants({
              panelPosition: mergedProps.panelElementProps?.panelPosition,
              animationDuration,
            })}
            animate={getPanelVisibleVariants({
              panelPosition: mergedProps.panelElementProps?.panelPosition,
              animationDuration,
            })}
            exit={getPanelHiddenVariants({
              panelPosition: mergedProps.panelElementProps?.panelPosition,
              animationDuration,
            })}
            ref={setContentRef}
          >
            <div class={clickOutsideClass}>
              {typeof mergedProps.children === 'function' ? mergedProps.children({ closePanel }) : mergedProps.children}
              <Show when={mergedProps.panelElementProps?.showCloseButton}>
                <button class={closeButton} onClick={closePanel}>
                  <Icon name="Close" />
                </button>
              </Show>
            </div>
          </Motion.div>
        </Motion.div>
      </Show>
    </Presence>
  );
};

export default Panel;
