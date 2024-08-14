import { JSX, Show, mergeProps } from 'solid-js';
import {
  ContentVariants,
  RootVariants,
  TitleWrapperVariants,
  content,
  root,
  title,
  titleWrapper,
} from './panel-content.css';
import { css } from '~/app/helpers/class';
import { Typography } from '~/app/components/typographies';

export type PanelContentProps = RootVariants &
  TitleWrapperVariants &
  ContentVariants & {
    children: JSX.Element;
    title?: string;
    class?: string;
  };

const defaultProps = {
  boxShadow: true,
  class: undefined,
  centerContent: false,
  background: 'white',
  centerTitle: false,
} as Partial<PanelContentProps>;

const PanelContent = (props: PanelContentProps): JSX.Element => {
  const mergedProps = mergeProps(defaultProps, props);
  return (
    <div
      class={css(
        root({
          background: mergedProps.background,
          radius: mergedProps.radius,
          boxShadow: mergedProps.boxShadow,
        }),
        mergedProps.class,
      )}
    >
      <Show when={!!props.title}>
        <div class={titleWrapper({ centerTitle: mergedProps.centerTitle, background: mergedProps.background })}>
          <Typography color="grey700" class={title({ background: mergedProps.background })} variant="h2">
            {props.title}
          </Typography>
        </div>
      </Show>
      <div class={content({ centerContent: mergedProps.centerContent })}>{mergedProps.children}</div>
    </div>
  );
};

export default PanelContent;
