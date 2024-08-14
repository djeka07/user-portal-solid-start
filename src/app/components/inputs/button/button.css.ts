import font from '../../../styles/font.css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import media from '../../../styles/media.css';
import fontCss from '../../../styles/font.css';
import borderCss from '../../../styles/border.css';
import paletteCss from '../../../styles/palette.css';
import { darken } from 'polished';

export const button = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: fontCss.size.normal,
    padding: 0,
    fontWeight: font.weight.bold,
    fontFamily: fontCss.family.main,
    transition: '0.3s background-color, border ease-in-out',
    outline: 'none',
    border: 0,
    color: 'rgb(255, 255, 255)',
    borderRadius: borderCss.small,
    backgroundColor: paletteCss.primary.main,
    width: '100%',
    [media.base]: {
      [media.small.up]: {
        width: 'auto',
      },
    },
  },
  variants: {
    color: {
      light: {
        backgroundColor: paletteCss.primary.light,
        selectors: {
          '&:focus': {
            boxShadow: `0 0 0 1px #ffffff, 0 0 0px 3px ${paletteCss.primary.light || '#3a97f9'}`,
          },
          '&:hover': {
            backgroundColor: darken(0.2, paletteCss.primary.light),
          },
        },
      },
      main: {
        backgroundColor: paletteCss.primary.main,
        selectors: {
          '&:focus': {
            boxShadow: `0 0 0 1px #ffffff, 0 0 0px 3px ${paletteCss.primary.main || '#3a97f9'}`,
          },
          '&:hover': {
            backgroundColor: darken(0.1, paletteCss.primary.main),
          },
        },
      },
      dark: {
        backgroundColor: paletteCss.primary.dark,
        selectors: {
          '&:focus': {
            boxShadow: `0 0 0 1px #ffffff, 0 0 0px 3px ${paletteCss.primary.dark || '#3a97f9'}`,
          },
          '&:hover': {
            backgroundColor: darken(0.1, paletteCss.primary.dark),
          },
        },
      },
      error: {
        backgroundColor: paletteCss.error.main,
        selectors: {
          '&:focus': {
            boxShadow: `0 0 0 1px #ffffff, 0 0 0px 3px ${paletteCss.error.main || '#3a97f9'}`,
          },
          '&:hover': {
            backgroundColor: darken(0.1, paletteCss.error.main),
          },
        },
      },
      success: {
        backgroundColor: paletteCss.success.main,
        selectors: {
          '&:focus': {
            boxShadow: `0 0 0 1px #ffffff, 0 0 0px 3px ${paletteCss.success.main || '#3a97f9'}`,
          },
          '&:hover': {
            backgroundColor: darken(0.1, paletteCss.success.main),
          },
        },
      },
      warning: {
        backgroundColor: paletteCss.warning.main,
        '&:focus': {
          boxShadow: `0 0 0 1px #ffffff, 0 0 0px 3px ${paletteCss.warning.main || '#3a97f9'}`,
        },
        '&:hover': {
          backgroundColor: darken(0.1, paletteCss.warning.main),
        },
      },
      info: {
        backgroundColor: paletteCss.info.main,
        '&:focus': {
          boxShadow: `0 0 0 1px #ffffff, 0 0 0px 3px ${paletteCss.info.main || '#3a97f9'}`,
        },
        '&:hover': {
          backgroundColor: darken(0.1, paletteCss.info.main),
        },
      },
      white: {
        backgroundColor: paletteCss.common.white,
        border: `2px solid ${paletteCss.primary.main}`,
        color: paletteCss.primary.main,
        selectors: {
          '&:focus': {
            boxShadow: `0 0 0 1px #ffffff, 0 0 0px 3px ${paletteCss.primary.main || '#3a97f9'}`,
          },
          '&:hover': {
            backgroundColor: paletteCss.primary.main,
            color: paletteCss.common.white,
          },
        },
      },
      transparent: {
        backgroundColor: 'transparent',
        selectors: {
          '&:focus': {
            boxShadow: `0 0 0 1px #ffffff, 0 0 0px 3px ${paletteCss.primary.main || '#3a97f9'}`,
          },
          '&:hover': {
            backgroundColor: 'rgba(50, 50, 50, 0.5)',
          },
        },
      },
    },
    fullWidthMobile: {
      false: {
        width: 'auto',
      },
      true: {
        width: '100%',
      },
    },
    round: {
      true: {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        [media.base]: {
          [media.small.up]: {
            width: '40px',
            height: '40px',
          },
        },
      },
    },
    wide: {
      true: {
        width: '100%',
        [media.base]: {
          [media.small.up]: {
            width: '100%',
          },
        },
      },
    },
    disabled: {
      true: {
        filter: 'opacity(0.5)',
        cursor: 'not-allowed',
        selectors: {
          '&:focus': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        color: 'light',
        disabled: true,
      },
      style: {
        selectors: {
          '&:hover': {
            backgroundColor: paletteCss.primary.light,
          },
        },
      },
    },
    {
      variants: {
        color: 'main',
        disabled: true,
      },
      style: {
        selectors: {
          '&:hover': {
            backgroundColor: paletteCss.primary.main,
          },
        },
      },
    },
    {
      variants: {
        color: 'dark',
        disabled: true,
      },
      style: {
        selectors: {
          '&:hover': {
            backgroundColor: paletteCss.primary.dark,
          },
        },
      },
    },
    {
      variants: {
        color: 'error',
        disabled: true,
      },
      style: {
        selectors: {
          '&:hover': {
            backgroundColor: paletteCss.error.main,
          },
        },
      },
    },
    {
      variants: {
        color: 'success',
        disabled: true,
      },
      style: {
        selectors: {
          '&:hover': {
            backgroundColor: paletteCss.success.main,
          },
        },
      },
    },
    {
      variants: {
        color: 'info',
        disabled: true,
      },
      style: {
        selectors: {
          '&:hover': {
            backgroundColor: paletteCss.info.main,
          },
        },
      },
    },
    {
      variants: {
        color: 'warning',
        disabled: true,
      },
      style: {
        selectors: {
          '&:hover': {
            backgroundColor: paletteCss.warning.main,
          },
        },
      },
    },
  ],
  defaultVariants: {
    round: undefined,
    color: 'main',
    fullWidthMobile: true,
    disabled: undefined,
  },
});

export const children = recipe({
  base: {
    width: '100%',
    padding: '13.4px 24px',
    outline: 'none',
  },
  variants: {
    color: {
      white: {},
      light: {},
      main: {},
      dark: {},
      error: {},
      transparent: {},
      success: {},
      info: {},
      warning: {},
    },
    size: {
      small: { padding: '6.4px 16px', fontSize: fontCss.size.small },
      medium: { padding: '9.4px 16px' },
      large: { padding: '13.4px 24px' },
    },
  },
  compoundVariants: [
    {
      variants: {
        color: 'white',
        size: 'small',
      },
      style: {
        padding: '4.4px 15px',
      },
    },
    {
      variants: {
        color: 'white',
        size: 'medium',
      },
      style: {
        padding: '7.4px 15px',
      },
    },
    {
      variants: {
        color: 'white',
        size: 'large',
      },
      style: {
        padding: '11.4px 23px',
      },
    },
  ],
  defaultVariants: {
    size: undefined,
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
export type ChildrenVariants = RecipeVariants<typeof children>;
