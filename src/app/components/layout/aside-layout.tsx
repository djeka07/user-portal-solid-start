import { JSXElement } from 'solid-js';

import { Title } from '@solidjs/meta';
import { RouteSectionProps } from '@solidjs/router';
import { aside, innerMain, main, MainVariants, root } from './aside-layout.css';

type AsideLayoutProps = Pick<RouteSectionProps, 'children'> &
  MainVariants & {
    asideRender: JSXElement | JSXElement[];
    title: string;
  };

const AsideLayout = (props: AsideLayoutProps) => {
  let ref: HTMLDivElement | undefined;

  return (
    <div class={root}>
      <Title>{props.title}</Title>
      <aside ref={ref} class={aside}>
        {props.asideRender}
      </aside>
      <div class={main}>
        <div class={innerMain({ margin: props.margin })}>{props.children}</div>
      </div>
    </div>
  );
};

export default AsideLayout;
