import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { keyframes, style } from '@vanilla-extract/css';
import borderCss from '../../../../app/styles/border.css';

const ghostAni = keyframes({
  '0%': {
    backgroundPosition: '-468px 0',
  },
  '100%': {
    backgroundPosition: '468px 0',
  },
});

export const ghostAnimation = style({
  animationFillMode: 'forwards',
  background: 'linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%) 0% 0% / 900px 104px',
  animation: `${ghostAni} 1s linear infinite`,
});

export const skeleton = recipe({
  base: {
    animationFillMode: 'forwards',
    background: 'linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%) 0% 0% / 900px 104px',
    animation: `${ghostAni} 1s linear infinite`,
    width: '100%',
  },
  variants: {
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
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export type SkeletonVariants = RecipeVariants<typeof skeleton>;
