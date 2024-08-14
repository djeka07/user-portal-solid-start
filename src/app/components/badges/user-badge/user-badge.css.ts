import { globalStyle, style } from '@vanilla-extract/css';
import fontCss from '../../../../app/styles/font.css';
import paletteCss from '../../../../app/styles/palette.css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import borderCss from '../../../../app/styles/border.css';

export const toolTip = style({
  display: 'none',
  position: 'absolute',
  right: 0,
  backgroundColor: paletteCss.background.dark,
  color: paletteCss.common.white,
  fontSize: fontCss.size.xxsmall,
  borderRadius: borderCss.small,
  minWidth: 150,
  padding: 4,
});

export const root = style({});

globalStyle(`${root}:hover > ${toolTip}`, {
  display: 'block',
});

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: paletteCss.link.light,
    background: paletteCss.grey[600],
    borderRadius: '50%',
    fontSize: fontCss.size.normal,
    fontWeight: fontCss.weight.bold,
  },
  variants: {
    size: {
      xsmall: {
        height: 15,
        width: 15,
        fontSize: fontCss.size.xxsmall,
      },
      small: {
        height: 20,
        width: 20,
        fontSize: fontCss.size.xsmall,
      },
      normal: {
        height: 30,
        width: 30,
      },
      large: {
        height: 40,
        width: 40,
      },
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

export type WrapperVariants = RecipeVariants<typeof wrapper>;
