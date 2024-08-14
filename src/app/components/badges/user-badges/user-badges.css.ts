import { style } from '@vanilla-extract/css';
import media from '../../../../app/styles/media.css';
import { recipe } from '@vanilla-extract/recipes';

export const badgeWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  [media.base]: {
    [media.small.up]: {
      minWidth: '52.5px',
      width: '52.5px',
    },
  },
});

export const badge = recipe({
  base: {
    selectors: {
      '&&': {
        position: 'relative',
        border: '2px solid var(--dark-background-color)',
      },
    },
  },
  variants: {
    isSecond: {
      true: {
        selectors: {
          '&&': {
            position: 'absolute',
            top: 0,
            left: 17.5,
            zIndex: 0,
          },
        },
      },
      false: {
        selectors: {
          '&&': {
            alignSelf: 'flex-end',
            zIndex: 1,
          },
        },
      },
    },
    isMultiple: {
      true: {
        selectors: {
          '&&': {
            width: 35,
            height: 35,
          },
        },
      },
      false: {
        selectors: {
          '&&': {
            width: 50,
            height: 50,
            fontSize: '1.25rem',
          },
        },
      },
    },
  },
  defaultVariants: {
    isSecond: undefined,
    isMultiple: false,
  },
});
