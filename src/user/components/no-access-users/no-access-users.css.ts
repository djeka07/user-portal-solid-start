import { style } from '@vanilla-extract/css';
export const root = style({
  width: '100%',
  minHeight: 250,
  backgroundColor: 'var(--light-background-color)',
  boxShadow: 'var(--box-shadow-main)',
  borderRadius: 'var(--border-radius-small)',
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

export const wrapper = style({
  margin: '20px 0',
});

export const userWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const usersCount = style({
  color: 'var(--700-grey-color)',
  fontWeight: 'var(--font-weight-bold)',
  fontSize: 'var(--font-size-large)',
});

export const buttonWrapper = style({
  margin: '20px 0',
  width: '100%',
  textDecoration: 'none',
});

export const textWrapper = style({
  width: '100%',
});
