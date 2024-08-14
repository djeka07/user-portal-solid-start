import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import font from '../../styles/font.css';
import paletteCss from '../../styles/palette.css';

export const link = recipe({
  base: {
    cursor: 'pointer',
    textDecoration: 'auto',
    display: 'flex',
  },

  variants: {
    color: {
      light: { color: paletteCss.link.light },
      main: { color: paletteCss.link.main },
      dark: { color: paletteCss.link.dark },
    },
    size: {
      small: { fontSize: font.size.small },
      normal: { fontSize: font.size.normal },
      large: { fontSize: font.size.large },
    },
  },

  defaultVariants: {
    color: 'main',
    size: 'normal',
  },
});

export type LinkVariants = RecipeVariants<typeof link>;
