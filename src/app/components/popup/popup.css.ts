import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
export const root = style({
  position: 'relative',
});

export const content = recipe({
  base: {
    position: 'absolute',
    boxShadow: 'var(--box-shadow-main)',
    borderRadius: 'var(--border-radius-small)',
    overflow: 'hidden',
    right: 0,
  },
  variants: {
    background: {
      light: { backgroundColor: 'var(--light-background-color)' },
      dark: { backgroundColor: 'var(--dark-background-color)' },
    },
  },
  defaultVariants: {
    background: 'light',
  },
});

export type ContentVariants = RecipeVariants<typeof content>;
