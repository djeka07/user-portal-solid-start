import { For, JSX, Show, createEffect } from 'solid-js';
import { usePanels } from '~/app/models/hooks/use-panels';
import Panel from './panel';
import { PanelProps } from './panel.type';

const PanelsRendererContainer = (): JSX.Element => {
  const [state, actions] = usePanels();

  createEffect(() => {
    if (state.hasPanels && state.panels.some((panel: PanelProps) => panel !== null) === false) {
      actions.clearAllPanels();
    }
  });

  return (
    <div id="panel-renderer">
      <Show when={state.hasPanels}>
        <For each={state.panels}>
          {(item, index) => (
            <Panel
              afterPanelClosed={item.afterPanelClosed}
              removePanelFromContext={() => {
                actions.removePanelByPosition(index());
              }}
              overlayElementProps={item.overlayElementProps}
              panelElementProps={item.panelElementProps}
              putFocusOnCloseRef={item.putFocusOnCloseRef}
              zIndex={50 + index()}
              lastInStack={index() === state.panels.length - 1}
              data-index={index()}
            >
              {item.children}
            </Panel>
          )}
        </For>
      </Show>
    </div>
  );
};

export default PanelsRendererContainer;
