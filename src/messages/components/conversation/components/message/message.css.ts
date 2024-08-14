import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import paletteCss from '../../../../../app/styles/palette.css';

export const messageWrapper = recipe({
  base: {
    justifySelf: 'left',
    maxWidth: '90%',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },
  variants: {
    user: {
      current: { justifySelf: 'right', alignItems: 'flex-end' },
    },
  },
  defaultVariants: {
    user: undefined,
  },
});

export const userWrapper = recipe({
  variants: {
    isGroup: {
      true: {
        cursor: 'pointer',
      },
    },
  },
});

export const message = recipe({
  base: {
    padding: '8px 12px',
    background: paletteCss.grey[600],
    justifySelf: 'left',
    color: paletteCss.link.light,
    borderRadius: 18,
    width: '100%',
  },
  variants: {
    user: {
      current: { justifySelf: 'right', backgroundColor: 'rgb(0, 132, 255)' },
    },
  },
  defaultVariants: {
    user: undefined,
  },
});

export const badgeMessageWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const badge = style({
  flexShrink: 0,
});
