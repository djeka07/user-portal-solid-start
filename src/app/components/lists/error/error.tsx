import { icon, root } from './error.css';
import AlertOctagonSvg from '~/app/components/icons/svgs/alert-octagon.svg';

type ErrorProps = {
  message: string;
};

const Error = (props: ErrorProps) => (
  <div class={root}>
    <AlertOctagonSvg class={icon} />
    {props.message}
  </div>
);

export default Error;
