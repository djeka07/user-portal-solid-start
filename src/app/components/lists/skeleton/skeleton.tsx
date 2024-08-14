import { css } from '~/app/helpers/class';
import { skeleton, SkeletonVariants, wrapper } from './skeleton.css';
import { For, mergeProps } from 'solid-js';

type SkeletonProps = SkeletonVariants & {
  amount?: number;
  width?: string;
  height?: string;
  class?: string;
};

const defaultProps = { height: '30px', width: '100%', amount: 1, radius: 'medium' } as Partial<SkeletonProps>;

const Skeleton = (props: SkeletonProps) => {
  const merge = mergeProps(defaultProps, props);
  return (
    <div class={css(props.class, wrapper)}>
      <For each={[...new Array(merge.amount)]}>
        {() => <div style={{ width: merge.width, height: merge.height }} class={skeleton({ radius: merge.radius })} />}
      </For>
    </div>
  );
};

export default Skeleton;
