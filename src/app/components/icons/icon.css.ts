import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import paletteCss from '../../../app/styles/palette.css';
import borderCss from '../../../app/styles/border.css';

export const wrapper = recipe({
  base: {
    padding: 8,
    boxShadow: paletteCss.boxShadow.main,
  },
  variants: {
    background: {
      white: {
        backgroundColor: paletteCss.common.white,
      },
      blue: {
        backgroundColor: paletteCss.background.main,
      },
      black: {
        backgroundColor: paletteCss.common.black,
      },
      grey: {
        backgroundColor: paletteCss.grey[300],
      },
    },
    radius: {
      none: { borderRadius: 0 },
      small: { borderRadius: borderCss.small },
      medium: { borderRadius: borderCss.medium },
      large: { borderRadius: borderCss.large },
      xlarge: { borderRadius: borderCss.xlarge },
      xxlarge: { borderRadius: borderCss.xxlarge },
      round: { borderRadius: borderCss.round },
    },
  },
  defaultVariants: {
    background: undefined,
    radius: 'round',
  },
});
export const svg = recipe({
  base: {
    display: 'block',
    width: 20,
    height: 20,
  },
  variants: {
    size: {
      small: { width: 15, height: 15 },
      normal: { width: 20, height: 20 },
      medium: { width: 25, height: 25 },
      large: { width: 30, height: 30 },
      xlarge: { width: 40, height: 40 },
      xxlarge: { width: 50, height: 50 },
    },
    color: {
      menu: { fill: '#afafaf' },
      white: { fill: paletteCss.common.white },
      grey100: { fill: paletteCss.grey[100] },
      grey200: { fill: paletteCss.grey[200] },
      grey300: { fill: paletteCss.grey[300] },
      grey400: { fill: paletteCss.grey[400] },
      grey500: { fill: paletteCss.grey[500] },
      grey600: { fill: paletteCss.grey[600] },
      grey700: { fill: paletteCss.grey[700] },
      grey800: { fill: paletteCss.grey[800] },
      grey900: { fill: paletteCss.grey[900] },
      black: { fill: paletteCss.common.black },
      primary: { fill: paletteCss.primary.main },
      success: { fill: paletteCss.success.dark },
      error: { fill: paletteCss.error.dark },
    },
    cursor: {
      pointer: { cursor: 'pointer' },
    },
  },
  defaultVariants: {
    size: 'normal',
    color: undefined,
  },
});

export type SvgVariants = RecipeVariants<typeof svg>;
export type WrapperVariants = RecipeVariants<typeof wrapper>;
