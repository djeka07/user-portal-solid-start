/* eslint-disable indent */
import { PanelAnimationDuration, PanelPosition } from './panel.type';

type GetPanelVariants = {
  panelPosition?: PanelPosition;
  animationDuration: PanelAnimationDuration;
};

export const getPanelHiddenVariants = ({ panelPosition, animationDuration }: GetPanelVariants) => {
  switch (panelPosition || PanelPosition.Right) {
    case PanelPosition.Left:
      return {
        x: '-100%',
        overflow: 'hidden',
        transition: { duration: animationDuration.panel.out, ease: 'linear' },
      };
    case PanelPosition.Right:
      return {
        x: '100%',
        overflow: 'hidden',
        transition: { duration: animationDuration.panel.out, ease: 'linear' },
      };
    case PanelPosition.Top:
      return {
        y: '-100%',
        overflow: 'hidden',
        transition: { duration: animationDuration.panel.out, ease: 'linear' },
      };
    case PanelPosition.Bottom:
      return {
        y: '100%',
        overflow: 'hidden',
        transition: { duration: animationDuration.panel.out, ease: 'linear' },
      };
    case PanelPosition.Center:
    case PanelPosition.Screen:
      return {
        overflow: 'hidden',
        opacity: 0,
        transition: { duration: animationDuration.panel.out, ease: 'linear' },
      };
  }
};

export const getPanelVisibleVariants = ({ panelPosition, animationDuration }: GetPanelVariants) => {
  switch (panelPosition || PanelPosition.Right) {
    case PanelPosition.Left:
      return {
        x: '0%',
        overflow: 'visible',
        transition: { duration: animationDuration.panel.in, delay: animationDuration.overlay.in, ease: 'easeIn' },
      };
    case PanelPosition.Right:
      return {
        x: '0%',
        overflow: 'visible',
        transition: { duration: animationDuration.panel.in, delay: animationDuration.overlay.in, ease: 'easeIn' },
      };
    case PanelPosition.Top:
      return {
        y: '0%',
        overflow: 'visible',
        transition: { duration: animationDuration.panel.in, delay: animationDuration.overlay.in, ease: 'easeIn' },
      };
    case PanelPosition.Bottom:
      return {
        y: '0%',
        overflow: 'visible',
        transition: { duration: animationDuration.panel.in, delay: animationDuration.overlay.in, ease: 'easeIn' },
      };
    case PanelPosition.Center:
    case PanelPosition.Screen:
      return {
        overflow: 'visible',
        opacity: 1,
        transition: { duration: animationDuration.panel.in, delay: animationDuration.overlay.in, ease: 'easeIn' },
      };
  }
};
