import { style } from '@vanilla-extract/css';
import mediaCss from '../../../app/styles/media.css';

export const search = style({
  padding: '10px 20px',
  borderBottom: '1px solid var(--400-grey-color)',
});

export const root = style({
  height: 'calc(100vh - 60px)',
  display: 'flex',
  flexDirection: 'column',
});

export const popup = style({
  left: 0,
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowY: 'auto',
});

export const newMessageWrapper = style({
  padding: 10,
  [mediaCss.base]: {
    [mediaCss.small.up]: {
      padding: 20,
    },
  },
});
