import { style } from '@vanilla-extract/css';
import paletteCss from '../../../app/styles/palette.css';

export const root = style({
  position: 'fixed',
  top: 72,
  right: 8,
});

export const item = style({
  padding: '10px 20px',
  background: paletteCss.notification,
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  selectors: {
    [`${root} div + &`]: {
      marginTop: 10,
    },
  },
});

export const icon = style({
  marginLeft: 10,
  fill: 'white',
});
