export const css = (...classes: (string | undefined)[]) => classes?.filter((s) => !!s).join(' ');
