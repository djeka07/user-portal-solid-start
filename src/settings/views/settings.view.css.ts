import { style } from '@vanilla-extract/css';
import media from '../../app/styles/media.css';

export const root = style({
  width: '100%',
  maxWidth: 1280,
  margin: '20px auto',
  backgroundColor: 'var(--light-background-color)',
  boxShadow: 'var(--box-shadow-main)',
  padding: 20,
  borderRadius: 'var(--border-radius-small)',
});

export const item = style({
  display: 'grid',
  gridTemplateColumns: '50% 50%',
  padding: '20px 10px',
  gap: 8,
  wordBreak: 'break-word',
  selectors: {
    [`${root} &`]: {
      borderTop: '1px solid var(--300-grey-color)',
    },
  },
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginBottom: 20,
  gap: 8,
  [media.base]: {
    [media.small.up]: {
      flexDirection: 'row',
    },
  },
});
