import { onCleanup, onMount } from 'solid-js';
import { PanelProps } from './panel.type';
import { usePanels } from '~/app/models/hooks/use-panels';

const PanelContainer = (props: PanelProps): null => {
  const [, { pushPanelToContext }] = usePanels();
  onMount(() => {
    pushPanelToContext({
      afterPanelClosed: props.afterPanelClosed,
      children: props.children,
      overlayElementProps: props.overlayElementProps,
      panelElementProps: props.panelElementProps,
      putFocusOnCloseRef: props.putFocusOnCloseRef,
    });
  });

  onCleanup(() => {
    props.afterPanelClosed();
  });

  return null;
};

export default PanelContainer;
