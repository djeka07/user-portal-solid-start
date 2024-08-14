import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import borderCss from '../../styles/border.css';
import media from '../../styles/media.css';
import paletteCss from '../../styles/palette.css';

export const root = style({
  display: 'flex',
  flex: 1,
  width: '100%',
});

export const main = style({
  flexGrow: 1,
  overflowX: 'hidden',
  overflowY: 'auto',
});

export const innerMain = recipe({
  variants: {
    margin: {
      small: {
        margin: 8,
        [media.base]: {
          [media.small.up]: {
            margin: 16,
          },
        },
      },
      medium: {
        margin: 16,
        [media.base]: {
          [media.small.up]: {
            margin: 32,
          },
        },
      },
      large: {
        margin: 24,
        [media.base]: {
          [media.small.up]: {
            margin: 48,
          },
        },
      },
    },
  },
  defaultVariants: {
    margin: undefined,
  },
});

export const aside = style({
  backgroundColor: paletteCss.background.main,
  boxShadow: paletteCss.boxShadow.main,
  flexShrink: 0,
  width: 75,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 'calc(100vh - 55px)',
  [media.base]: {
    [media.small.up]: {
      width: 250,
      padding: 8,
    },
  },
});

export const iconWrapper = style({
  borderTopRightRadius: borderCss.small,
  borderBottomRightRadius: borderCss.small,
  backgroundColor: paletteCss.background.dark,
  boxShadow: paletteCss.boxShadow.main,
  padding: 10,
  zIndex: 1,
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  position: 'fixed',
  top: '50%',
  right: -45,
  [media.base]: {
    [media.small.up]: {
      display: 'none',
    },
  },
});

export type MainVariants = RecipeVariants<typeof innerMain>;
