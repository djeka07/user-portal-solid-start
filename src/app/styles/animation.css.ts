import { keyframes, style } from '@vanilla-extract/css';

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
