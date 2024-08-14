import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import media from '../../../styles/media.css';
import paletteCss from '../../../styles/palette.css';

export const root = recipe({
  base: {
    position: 'relative',
  },
  variants: {
    width: {
      full: { width: '100%' },
    },
  },
  defaultVariants: { width: 'full' },
});

export const wrapper = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    width: {
      full: { width: '100%' },
    },
  },
  defaultVariants: { width: undefined },
});

export type WrapperVariants = RecipeVariants<typeof wrapper>;

export const label = recipe({
  base: {
    color: 'rgb(97, 97, 97)',
    fontSize: 'var(--font-size-small)',
    marginBottom: 4,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    transformOrigin: 'top left',
    transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    pointerEvents: 'none',
  },
  variants: {
    float: {
      true: {
        fontSize: '0.925rem',
        transform: 'translate(14px, -7px) scale(0.75)',
      },
      false: {
        transform: 'translate(14px, 16px) scale(1)',
      },
    },
    focus: {
      true: {
        color: 'var(--button-primary-main-bg-color)',
      },
    },
    errored: {
      true: {
        color: 'var(--dark-error-color)',
        fontSize: '0.925rem',
      },
    },
  },
  defaultVariants: {
    focus: false,
    float: false,
    errored: false,
  },
});

export const fieldset = recipe({
  base: {
    top: ' -5px',
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    padding: '0 8px',
    overflow: 'hidden',
    position: 'absolute',
    borderStyle: 'solid',
    pointerEvents: 'none',
    borderColor: 'rgb(224 224 224)',
    borderWidth: '1px',
  },
  variants: {
    focus: {
      true: {
        borderWidth: '2px',
        borderColor: 'var(--button-primary-main-bg-color)',
      },
    },
    errorFocus: {
      true: {
        borderWidth: '2px',
        borderColor: 'var(--light-error-color)',
      },
    },
    radius: {
      small: {
        borderRadius: 4,
        '+ div > div': {
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
        },
      },
      medium: {
        borderRadius: 8,
        '+ div > div': {
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        },
      },
      large: {
        borderRadius: 12,
        '+ div > div': {
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
        },
      },
      xlarge: {
        borderRadius: 16,
        '+ div > div': {
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        },
      },
      xxlarge: {
        borderRadius: 20,
        '+ div > div': {
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
        },
      },
    },
    errored: {
      true: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
  defaultVariants: {
    radius: 'small',
    focus: undefined,
    errored: undefined,
    errorFocus: undefined,
  },
});

export const legend = recipe({
  base: {
    width: 'auto',
    height: '11px',
    display: 'block',
    padding: 0,
    fontSize: '0.65rem',
    maxWidth: '0.01px',
    textAlign: 'left',
    transition: 'max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    visibility: 'hidden',
  },
  variants: {
    focus: {
      true: {
        maxWidth: '1000px',
      },
    },
  },
  defaultVariants: {
    focus: undefined,
  },
});

export const legentSpan = style({
  paddingLeft: '5px',
  paddingRight: '5px',
});

export const error = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(248, 215, 218)',
    color: paletteCss.error.dark,
    overflow: 'hidden',
    fontSize: '0.875rem',
    padding: '8px',
  },
  variants: {
    radius: {
      small: {
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
      },
      medium: {
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      },
      large: {
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
      },
      xlarge: {
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
      },
      xxlarge: {
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
      },
    },
  },
  defaultVariants: {
    radius: 'small',
  },
});

export const errorSvg = style({
  fill: paletteCss.error.dark,
  marginRight: 5,
});

export const inputBackgroundColor = 'rgb(255, 255, 255)';

export const input = style({
  cursor: 'auto',
  position: 'relative',
  width: '100%',
  padding: '0px 12px',
  height: 48,
  borderRadius: 0,
  color: 'rgb(66, 66, 66)',
  backgroundColor: inputBackgroundColor,
  border: 0,
  fontSize: 16,
  appearance: 'none',
  outline: 'none',
  [media.base]: {
    [media.small.up]: {
      fontSize: 14,
    },
  },
  selectors: {
    '&:-webkit-autofill': {
      [`~ ${label}`]: {
        color: 'ref',
      },
    },
  },
});

export type InputVariants = RecipeVariants<typeof error>;
