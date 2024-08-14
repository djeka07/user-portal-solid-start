import { Signal } from 'solid-js';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      // use:model
      model: Signal<string>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formSubmit: (element: Element, accessor: any) => any;
      clickOutside: () => void;
    }
  }
}
