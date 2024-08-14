import { recipe } from '@vanilla-extract/recipes';
import { PanelPosition, PanelSize } from './panel.type';
import { style } from '@vanilla-extract/css';
import paletteCss from '../../../app/styles/palette.css';

export const overlay = recipe({
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    backdropFilter: 'blur(2px)',
  },
  variants: {
    panelPosition: {
      [PanelPosition.Left]: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
      },
      [PanelPosition.Right]: {
        alignItems: 'stretch',
        justifyContent: 'flex-end',
      },
      [PanelPosition.Top]: {
        alignItems: 'flex-start',
        justifyContent: 'stretch',
      },
      [PanelPosition.Bottom]: {
        alignItems: 'flex-end',
        justifyContent: 'stretch',
      },
      [PanelPosition.Center]: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      [PanelPosition.Screen]: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  defaultVariants: {
    panelPosition: PanelPosition.Right,
  },
});

export const panelElement = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'default',
    position: 'relative',
    height: '100%',
    width: '100%',
    flexGrow: 1,
  },
  variants: {
    width: {
      [PanelPosition.Left]: {
        maxWidth: PanelSize.Large,
      },
      [PanelPosition.Right]: {
        maxWidth: PanelSize.Large,
      },
      [PanelPosition.Top]: {
        maxWidth: PanelSize.Max,
      },
      [PanelPosition.Bottom]: {
        maxWidth: PanelSize.Max,
      },
      [PanelPosition.Center]: {
        maxWidth: PanelSize.Medium,
      },
      [PanelPosition.Screen]: {
        maxWidth: PanelSize.Max,
      },
      undefined: {},
    },
    height: {
      [PanelPosition.Left]: {
        maxHeight: PanelSize.Max,
      },
      [PanelPosition.Right]: {
        maxHeight: PanelSize.Max,
      },
      [PanelPosition.Top]: {
        maxHeight: PanelSize.Xsmall,
      },
      [PanelPosition.Bottom]: {
        maxHeight: PanelSize.Xsmall,
      },
      [PanelPosition.Center]: {
        maxHeight: PanelSize.Small,
      },
      [PanelPosition.Screen]: {
        maxHeight: PanelSize.Max,
      },
    },
  },
  defaultVariants: {
    width: undefined,
    height: undefined,
  },
});

export const clickOutside = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100%',
  width: '100%',
  flexGrow: 1,
});

export const closeButton = style({
  width: 30,
  height: 30,
  borderRadius: '50%',
  padding: 0,
  justifySelf: 'center',
  minHeight: 30,
  minWidth: 30,
  position: 'absolute',
  top: 20,
  cursor: 'pointer',
  right: 20,
  backgroundColor: paletteCss.common.white,
  boxShadow: paletteCss.boxShadow.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 0,
});
