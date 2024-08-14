/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accessor, onCleanup } from 'solid-js';

export const clickOutside = (el: Element, accessor: () => Accessor<unknown>) => {
  const onClick = (e: any) => {
    if (!el.contains(e.target)) {
      e.stopPropagation();
      accessor()?.();
    }
  };
  document.body.addEventListener('click', onClick);

  onCleanup(() => document.body.removeEventListener('click', onClick));
};
