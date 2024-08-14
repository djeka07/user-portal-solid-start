import { style } from '@vanilla-extract/css';
import borderCss from '../../../app/styles/border.css';
import fontCss from '../../../app/styles/font.css';
import paletteCss from '../../../app/styles/palette.css';

export const root = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  backgroundColor: paletteCss.background.light,
  boxShadow: paletteCss.boxShadow.main,
  padding: '20px',
  borderRadius: borderCss.small,
});

export const popupRoot = style({
  alignSelf: 'center',
});

export const nameAndRolesWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const popup = style({
  minWidth: 300,
});

export const item = style({
  padding: 10,
  cursor: 'pointer',
  transition: '0.3s background ease-in-out',
  backgroundColor: paletteCss.background.light,
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(60, 60, 60, 0.4)',
    },
  },
});

export const rolesWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: paletteCss.grey[600],
  fontSize: fontCss.size.small,
  borderRadius: borderCss.medium,
});

export const icon = style({
  border: `2px solid ${paletteCss.grey[600]}`,
  borderRadius: '50%',
});

export const actionsButtonContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});
