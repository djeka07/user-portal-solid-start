import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import paletteCss from '../../../../../app/styles/palette.css';
import media from '../../../../../app/styles/media.css';
import borderCss from '../../../../../app/styles/border.css';
import fontCss from '../../../../../app/styles/font.css';

export const userItem = recipe({
  base: {
    padding: '10px 10px 10px 15px',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: borderCss.small,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    [media.base]: {
      [media.small.up]: {
        padding: '10px 10px 10px 25px',
        justifyContent: 'initial',
        '::before': {
          height: '12px',
          width: '12px',
          left: '5px',
        },
      },
    },
    '::before': {
      content: '',
      position: 'absolute',
      height: 10,
      width: 10,
      borderRadius: 10,
      left: 8,
    },
    selectors: {
      '&&&': {
        color: 'white',
      },
    },
  },
  variants: {
    selected: { true: { backgroundColor: 'rgba(0,0,0, 0.2)' } },
    online: {
      true: {
        '::before': {
          backgroundColor: paletteCss.success.main,
        },
      },
      false: {
        '::before': {
          backgroundColor: paletteCss.error.main,
        },
      },
    },
  },

  defaultVariants: {
    selected: undefined,
    online: false,
  },
});

export const users = style({
  flexGrow: 1,
  overflowY: 'auto',
});

export const name = style({
  maxWidth: 'none',
  overflow: 'initial',
  display: 'none',
  [media.base]: {
    [media.small.up]: {
      display: 'block',
    },
  },
});

export const numberOfUsers = style({
  textAlign: 'center',
  color: 'white',
  marginTop: 10,
  paddingTop: 10,
  borderTop: `1px solid ${paletteCss.grey[400]}`,
  fontSize: fontCss.size.small,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 4,
  paddingRight: 4,
});

export const icon = style({
  selectors: {
    '&&': {
      [media.base]: {
        [media.small.down]: {
          position: 'absolute',
          top: 0,
          right: 4,
          backgroundColor: paletteCss.grey[300],
          borderRadius: '50%',
          padding: 3,
          fill: paletteCss.grey[600],
        },
      },
    },
  },
});
