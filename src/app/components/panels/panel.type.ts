import { Accessor, JSX, Ref } from 'solid-js';

export type PanelElementProps = {
  maxWidth?: PanelSize;
  maxHeight?: PanelSize;
  panelPosition?: PanelPosition;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
};

export type OverlayElementProps = {
  shouldCloseOnClick?: boolean;
};

export type PanelChildrenReturn = {
  closePanel: () => void;
};

export type PanelProps = {
  children: ((params: PanelChildrenReturn) => JSX.Element) | JSX.Element;
  putFocusOnCloseRef?: Ref<undefined>;
  initialFocusOnElement?: Accessor<HTMLElement | null>;
  panelElementProps?: PanelElementProps;
  overlayElementProps?: OverlayElementProps;
  afterPanelClosed: () => void;
};

export type PanelAnimationDuration = {
  overlay: {
    in: number;
    out: number;
  };
  panel: {
    in: number;
    out: number;
  };
};

export enum PanelSize {
  Xsmall = '350px',
  Small = '500px',
  Medium = '700px',
  Large = '850px',
  Xlarge = '1024px',
  Max = '100%',
}

export enum PanelPosition {
  Right = 'Right',
  Left = 'Left',
  Center = 'Center',
  Top = 'Top',
  Bottom = 'Bottom',
  Screen = 'Screen',
}

export enum PanelDelayDuration {
  Quicker = 500,
  Quick = 700,
  Short = 1000,
  Medium = 1500,
  Long = 2000,
  Longer = 3000,
  Longest = 5000,
}
