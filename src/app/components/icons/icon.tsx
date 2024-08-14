/* eslint-disable solid/reactivity */
import { css } from '~/app/helpers/class';
import { svg, SvgVariants, WrapperVariants, wrapper } from './icon.css';
import * as Svgs from './svgs';
import { Show } from 'solid-js';

export type IconProps = SvgVariants & {
  name: Svgs.IconNames;
  class?: string;
  onClick?: () => void;
};

const IconSvg = (props: IconProps) => {
  const Svg = Svgs[props.name];

  return (
    <Svg
      onClick={() => props.onClick?.()}
      class={css(
        svg({ size: props.size, cursor: props.onClick ? 'pointer' : undefined, color: props.color }),
        props.class,
      )}
    />
  );
};

const Icon = (props: IconProps & WrapperVariants) => (
  <Show when={!!props.background} fallback={<IconSvg {...props} />}>
    <div class={wrapper({ background: props.background })}>
      <IconSvg {...props} />
    </div>
  </Show>
);

export default Icon;
