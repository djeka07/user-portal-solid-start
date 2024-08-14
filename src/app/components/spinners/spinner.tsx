import { root, RootVariants, rotate, SpinnerVariants } from './spinner.css';

type SpinnerProps = SpinnerVariants & RootVariants;

const Spinner = (props: SpinnerProps) => (
  <span class={root({ size: props?.size, margin: props?.margin })}>
    <span class={rotate({ color: props?.color, size: props?.size })} />
    <span class={rotate({ color: props?.color, size: props?.size })} />
    <span class={rotate({ color: props?.color, size: props?.size })} />
    <span class={rotate({ color: props?.color, size: props?.size })} />
  </span>
);

export default Spinner;
