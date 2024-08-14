import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import fontCss from '../../../styles/font.css';
import paletteCss from '../../../styles/palette.css';

export const root = style({
  position: 'relative',
  maxWidth: '100%',
});

export const input = recipe({
  base: {
    cursor: 'pointer',
    width: 20,
    height: 20,
    appearance: 'none',
    WebkitAppearance: 'none',
    border: 'solid 1px #cccccc',
    position: 'relative',
    selectors: {
      '&:checked::before': {
        content: '',
        width: 14,
        height: 14,
        backgroundColor: paletteCss.primary.main,
        position: 'absolute',
        top: 2,
        left: 2,
      },
    },
  },
  variants: {
    error: {
      true: {
        selectors: {},
      },
    },
    radius: {
      small: {
        borderRadius: '4px',
        selectors: {
          '&:checked::before': {
            borderRadius: '4px',
          },
        },
      },
      medium: {
        borderRadius: '8px',
        selectors: {
          '&:checked::before': {
            borderRadius: '4px',
          },
        },
      },
      large: {
        borderRadius: '12px',
        selectors: {
          '&:checked::before': {
            borderRadius: '4px',
          },
        },
      },
      xlarge: {
        borderRadius: '16px',
        selectors: {
          '&:checked::before': {
            borderRadius: '4px',
          },
        },
      },
      xxlarge: {
        borderRadius: '20px',
        selectors: {
          '&:checked::before': {
            borderRadius: '4px',
          },
        },
      },
    },
  },
  defaultVariants: {
    error: undefined,
    radius: 'small',
  },
});

export const label = style({
  fontSize: fontCss.size.small,
  color: paletteCss.grey[900],
  textOverflow: 'ellipsis',
});

export const children = recipe({
  base: {
    paddingLeft: '10px',
    color: paletteCss.grey[600],
    fontSize: fontCss.size.small,
  },
  variants: {
    paddingLeft: {
      true: {
        paddingLeft: '25px',
      },
    },
  },
});

export const errorSvg = style({
  fill: paletteCss.error.dark,
  marginRight: 5,
});

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    userSelect: 'none',
  },
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
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

export type InputVariants = RecipeVariants<typeof error>;
