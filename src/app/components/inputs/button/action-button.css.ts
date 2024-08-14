import { style } from '@vanilla-extract/css';
import paletteCss from '../../../styles/palette.css';
import fontCss from '../../../styles/font.css';

export const actionButton = style({
  selectors: {
    '&&&': {
      fontWeight: 'normal',
      border: `2px dashed ${paletteCss.grey[600]}`,
      minHeight: 90,
    },
    '&&&:hover': {
      backgroundColor: paletteCss.grey[300],
    },
  },
});

export const typography = style({
  display: 'block',
});

export const root = style({
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
});
