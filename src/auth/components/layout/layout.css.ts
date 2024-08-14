import { style } from '@vanilla-extract/css';
import media from '../../../app/styles/media.css';

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
  padding: 16,
  [media.base]: {
    [media.small.up]: {
      padding: 24,
    },
  },
});

export const formWrapper = style({
  padding: 16,
  backgroundColor: 'white',
  borderRadius: 3,
  maxWidth: '600px',
  display: 'grid',
  gap: 10,
  width: '100%',
  [media.base]: {
    [media.small.up]: {
      padding: 40,
    },
  },
});
