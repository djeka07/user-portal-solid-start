import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import font from '../../styles/font.css';
import media from '../../styles/media.css';

export const typography = recipe({
  base: {
    fontFamily: 'Campton, arial',
  },

  variants: {
    color: {
      light: { color: '#ffffff' },
      grey100: { color: 'var(--100-grey-color)' },
      grey200: { color: 'var(--200-grey-color)' },
      grey300: { color: 'var(--300-grey-color)' },
      grey400: { color: 'var(--400-grey-color)' },
      grey500: { color: 'var(--500-grey-color)' },
      grey600: { color: 'var(--600-grey-color)' },
      grey700: { color: 'var(--700-grey-color)' },
      grey800: { color: 'var(--800-grey-color)' },
      grey900: { color: 'var(--900-grey-color)' },
      success: { color: 'var(--dark-success-color)' },
      menu: { color: '#afafaf' },
      error: { color: 'var(--dark-error-color)' },
      inherit: { color: 'inherit' },
    },
    size: {
      xsmall: { fontSize: 'var(--font-size-xsmall)' },
      small: { fontSize: 'var(--font-size-small)' },
      normal: { fontSize: 'var(--font-size-normal)' },
      medium: { fontSize: 'var(--font-size-medium)' },
      large: { fontSize: 'var(--font-size-large)' },
      xlarge: { fontSize: 'var(--font-size-xlarge)' },
      xxlarge: { fontSize: 'var(--font-size-xxlarge)' },
      xxxlarge: { fontSize: 'var(--font-size-xxxlarge)' },
      hero: { fontSize: 'var(--font-size-hero)' },
    },
    marginTop: {
      small: {
        marginTop: 5,
        [media.base]: {
          [media.small.up]: {
            marginTop: 10,
          },
        },
      },
      medium: {
        marginTop: 10,
        [media.base]: {
          [media.small.up]: {
            marginTop: 20,
          },
        },
      },
      large: {
        marginTop: 20,
        [media.base]: {
          [media.small.up]: {
            marginTop: 40,
          },
        },
      },
    },
    marginRight: {
      small: {
        marginRight: 5,
        [media.base]: {
          [media.small.up]: {
            marginRight: 10,
          },
        },
      },
      medium: {
        marginRight: 10,
        [media.base]: {
          [media.small.up]: {
            marginRight: 20,
          },
        },
      },
      large: {
        marginRight: 20,
        [media.base]: {
          [media.small.up]: {
            marginRight: 40,
          },
        },
      },
    },
    marginBottom: {
      small: {
        marginBottom: 5,
        [media.base]: {
          [media.small.up]: {
            marginBottom: 10,
          },
        },
      },
      medium: {
        marginBottom: 10,
        [media.base]: {
          [media.small.up]: {
            marginBottom: 20,
          },
        },
      },
      large: {
        marginBottom: 20,
        [media.base]: {
          [media.small.up]: {
            marginBottom: 40,
          },
        },
      },
    },
    marginLeft: {
      small: {
        marginLeft: 5,
        [media.base]: {
          [media.small.up]: {
            marginLeft: 10,
          },
        },
      },
      medium: {
        marginLeft: 10,
        [media.base]: {
          [media.small.up]: {
            marginLeft: 20,
          },
        },
      },
      large: {
        marginLeft: 20,
        [media.base]: {
          [media.small.up]: {
            marginLeft: 40,
          },
        },
      },
    },
    weight: {
      thin: { fontWeight: font.weight.thin },
      regular: { fontWeight: font.weight.regular },
      bold: { fontWeight: font.weight.bold },
    },
    align: {
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
    fontStyle: {
      italic: { fontStyle: 'italic' },
      oblique: { fontStyle: 'oblique' },
    },
    transform: {
      inherit: { textTransform: 'inherit' },
      capitalize: { textTransform: 'capitalize' },
      lowercase: { textTransform: 'lowercase' },
      uppercase: { textTransform: 'uppercase' },
    },
    wordBreak: {
      breakAll: { wordBreak: 'break-all' },
      breakWord: { wordBreak: 'break-word' },
    },
    cursor: {
      pointer: { cursor: 'pointer' },
    },
  },
  defaultVariants: {
    marginTop: undefined,
    marginRight: undefined,
    marginBottom: undefined,
    marginLeft: undefined,
    color: 'light',
    align: undefined,
    size: undefined,
    weight: undefined,
    fontStyle: undefined,
    transform: undefined,
    wordBreak: undefined,
    cursor: undefined,
  },
});

export type TypographyVariants = RecipeVariants<typeof typography>;
