import { JSXElement } from 'solid-js';
import { main, formWrapper } from './layout.css';

type LayoutProps = { children: JSXElement };
const Layout = (props: LayoutProps) => (
  <main class={main}>
    <div class={formWrapper}>{props.children}</div>
  </main>
);

export default Layout;
