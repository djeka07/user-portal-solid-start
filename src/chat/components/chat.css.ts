import { style } from '@vanilla-extract/css';
import font from '../../app/styles/font.css';

export const root = style({
  position: 'fixed',
  backgroundColor: 'rgb(53, 64, 82)',
  boxShadow: 'rgb(0 0 0 / 25%) 0px 1px 5px -1px',
  bottom: 0,
  right: 0,
  borderTopLeftRadius: 6,
  width: 300,
});

export const icon = style({
  width: 20,
  height: 20,
  fill: '#ffffff',
});

export const username = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  cursor: 'pointer',
  transition: '0.3s all ease-in-out',
  padding: 10,
  fontWeight: font.weight.bold,
  color: '#ffffff',
});

export const heading = style({
  padding: 10,
});

export const listWrapper = style({
  backgroundColor: '#ffffff',
  height: '100%',
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  margin: '0 5px',
  boxShadow: 'rgb(0 0 0 / 25%) 0px 1px 5px -1px',
  padding: 10,
});

export const list = style({
  margin: '0 -10px',
  height: '25vh',
});

export const online = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px 10px 30px',
  transition: '0.3s all ease-in-out',
  cursor: 'pointer',
  '::before': {
    content: '',
    backgroundColor: 'green',
    width: 10,
    height: 10,
    position: 'absolute',
    left: 15,
    borderRadius: '50%',
  },
  ':hover': {
    backgroundColor: 'rgba(45, 45, 45, 0.2)',
  },
  borderBottom: '1px solid #e3e3e3',
  selectors: {
    [`${list} &:last-child`]: {
      borderBottom: 0,
    },
  },
});

export const noUsers = style({
  padding: '0px 20px',
});
