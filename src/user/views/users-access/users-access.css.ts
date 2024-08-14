import { style } from '@vanilla-extract/css';

export const content = style({
  backgroundColor: 'var(--light-background-color)',
  borderBottomLeftRadius: 'var(--border-radius-small)',
  borderBottomRightRadius: 'var(--border-radius-small)',
  padding: 20,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'var(--300-grey-color)',
  borderTopLeftRadius: 'var(--border-radius-small)',
  borderTopRightRadius: 'var(--border-radius-small)',
  padding: 20,
});

export const spinner = style({
  display: 'flex',
  justifyContent: 'center',
});
