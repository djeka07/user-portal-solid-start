import { style } from '@vanilla-extract/css';
import paletteCss from '../../../styles/palette.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 10,
  backgroundColor: paletteCss.error.light,
  color: paletteCss.error.dark,
  textAlign: 'center',
  borderRadius: 6,
  padding: 10,
});

export const icon = style({
  width: 40,
  height: 40,
  fill: paletteCss.error.dark,
});
