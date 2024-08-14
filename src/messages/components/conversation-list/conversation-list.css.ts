import { style } from '@vanilla-extract/css';
import paletteCss from '../../../app/styles/palette.css';
export const headingWrapper = style({
  marginBottom: 10,
  paddingBottom: 5,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${paletteCss.grey[400]}`,
});

export const svg = style({
  fill: '#ffffff',
});
