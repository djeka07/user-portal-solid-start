import { style } from '@vanilla-extract/css';

export const root = style({
  width: '100%',
  maxWidth: 1280,
  margin: '20px 20px',
  backgroundColor: 'var(--light-background-color)',
  boxShadow: 'var(--box-shadow-main)',
  padding: 20,
  borderRadius: 'var(--border-radius-small)',
});
