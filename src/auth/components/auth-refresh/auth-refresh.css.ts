import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'fixed',
  top: 70,
  zIndex: 1,
  right: 20,
  backgroundColor: 'var(--light-background-color)',
  padding: 15,
  width: 200,
  borderRadius: 'var(--border-radius-small)',
  boxShadow: 'var(--box-shadow-main)',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
});

export const motion = style({
  position: 'relative',
  zIndex: 1,
});
