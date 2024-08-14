import { Component, JSX, JSXElement, mergeProps } from 'solid-js';
import { css } from '~/app/helpers/class';
import { link, LinkVariants } from './link.css';
import { A } from '@solidjs/router';

type LinkProps = LinkVariants & {
  href: string;
  class?: string;
  title?: string;
  children: JSXElement;
  onClick?: JSX.EventHandlerUnion<HTMLAnchorElement, MouseEvent> | undefined;
};

const defaultProps = {} as Partial<LinkProps>;

const Link: Component<LinkProps> = (props) => {
  const merge = mergeProps(defaultProps, props);
  return (
    <A
      onClick={props.onClick}
      title={props.title}
      class={css(link({ size: merge.size, color: merge.color }), merge.class)}
      href={merge.href}
    >
      {merge.children}
    </A>
  );
};

export default Link;
