import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import fontCss from '../../styles/font.css';
import paletteCss from '../../styles/palette.css';
import { style } from '@vanilla-extract/css';
import borderCss from '../../styles/border.css';

export const message = recipe({
  base: {
    fontSize: fontCss.size.small,
    borderRadius: borderCss.small,
    overflow: 'hidden',
  },
  variants: {
    type: {
      error: { backgroundColor: paletteCss.error.light, color: paletteCss.error.dark },
      success: { backgroundColor: paletteCss.success.light, color: paletteCss.success.dark },
      warning: { backgroundColor: paletteCss.warning.light, color: paletteCss.warning.dark },
      info: { backgroundColor: paletteCss.info.light, color: paletteCss.info.dark },
    },
  },
});

export const innerMessage = style({
  padding: '10px 10px',
});

export type MessageVariants = RecipeVariants<typeof message>;
