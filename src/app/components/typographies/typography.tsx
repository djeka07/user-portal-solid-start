/* eslint-disable solid/reactivity */
import { Dynamic } from 'solid-js/web';
import { JSXElement, mergeProps } from 'solid-js';
import { TypographyVariants, typography } from './typography.css';
import { css } from '~/app/helpers/class';

export type Variant = 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label' | 'p' | 'span';

type Element = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label' | 'p' | 'span' | 'div';

export const elementMap: { [key: string]: Element } = {
  hero: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'div',
  caption: 'caption',
  label: 'span',
  p: 'p',
  span: 'span',
};

export type TypographyProps = TypographyVariants & {
  variant?: Variant;
  as?: Element;
  class?: string;
  onClick?: () => void;
  children: JSXElement;
};

const defaultProps = { variant: 'body', color: 'light' } as Partial<TypographyProps>;

const Typography = (props: TypographyProps) => {
  const mergedProps = mergeProps(defaultProps, props);

  const onClick = () => {
    if (mergedProps.onClick) {
      mergedProps.onClick();
    }
  };

  return (
    <Dynamic
      onClick={mergedProps.onClick ? onClick : undefined}
      class={css(
        typography({
          align: mergedProps.align,
          color: mergedProps.color,
          size: mergedProps.size,
          weight: mergedProps.weight,
          fontStyle: mergedProps.fontStyle,
          transform: mergedProps.transform,
          wordBreak: mergedProps.wordBreak,
          marginTop: mergedProps.marginTop,
          marginRight: mergedProps.marginRight,
          marginBottom: mergedProps.marginBottom,
          marginLeft: mergedProps.marginLeft,
          cursor: mergedProps.onClick ? 'pointer' : mergedProps.cursor,
        }),
        mergedProps.class,
      )}
      component={mergedProps.as || elementMap[mergedProps.variant as Variant]}
    >
      {mergedProps.children}
    </Dynamic>
  );
};

export default Typography;
