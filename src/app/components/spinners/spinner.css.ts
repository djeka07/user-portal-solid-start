import { keyframes } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

const spinner = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const root = recipe({
  base: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    margin: {
      no: { margin: 0 },
      small: { margin: '0 10px' },
      normal: { margin: '5px 20px' },
      large: { margin: '10px 30px' },
    },
    size: {
      small: {
        width: 25,
        height: 25,
      },
      normal: {
        width: 35,
        height: 35,
      },
      large: {
        width: 50,
        height: 50,
      },
    },
  },
  defaultVariants: {
    margin: 'normal',
    size: 'normal',
  },
});

export const rotate = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
    margin: 0,
    border: '4px solid',
    borderRadius: '50%',
    animation: `${spinner} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
    borderColor: '#fff transparent transparent transparent',
    selectors: {
      ['span > span:nth-child(1)&']: {
        animationDelay: '-0.45s',
      },
      ['span > span:nth-child(2)&']: {
        animationDelay: '-0.3s',
      },
      ['span > span:nth-child(3)&']: {
        animationDelay: '-0.15s',
      },
    },
  },
  variants: {
    size: {
      small: {
        width: 25,
        height: 25,
      },
      normal: {
        width: 35,
        height: 35,
      },
      large: {
        width: 50,
        height: 50,
      },
    },
    color: {
      light: {
        borderColor: '#fff transparent transparent transparent',
      },
      dark: {
        borderColor: 'var(--700-grey-color) transparent transparent transparent',
      },
      success: {
        borderColor: 'var(--dark-success-color) transparent transparent transparent',
      },
      error: {
        borderColor: 'var(--dark-error-color) transparent transparent transparent',
      },
    },
  },
  defaultVariants: {
    color: 'light',
    size: 'normal',
  },
});

export type SpinnerVariants = RecipeVariants<typeof rotate>;

export type RootVariants = RecipeVariants<typeof root>;
