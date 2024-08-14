import { style } from '@vanilla-extract/css';
import paletteCss from '../../../../../app/styles/palette.css';
export const root = style({
  backgroundColor: paletteCss.background.main,
  display: 'grid',
  gridTemplateColumns: 'calc(100% - 40px) 40px',
  padding: 10,
  width: '100%',
});
