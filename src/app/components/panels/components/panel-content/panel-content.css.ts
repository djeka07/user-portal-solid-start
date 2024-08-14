import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import paletteCss from '../../../../../app/styles/palette.css';

export const root = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
    margin: '1px',
  },
  variants: {
    radius: {
      small: { borderRadius: 4 },
      medium: { borderRadius: 8 },
      large: { borderRadius: 12 },
      xlarge: { borderRadius: 16 },
      xxlarge: { borderRadius: 20 },
    },
    background: {
      grey: {
        backgroundColor: '#e3e3e3',
      },
      white: {
        backgroundColor: '#ffffff',
      },
      blue: {
        backgroundColor: paletteCss.background.main,
      },
    },

    boxShadow: {
      true: {
        boxShadow: paletteCss.boxShadow.main,
      },
    },
  },
  defaultVariants: {
    background: 'white',
    radius: 'small',
    boxShadow: undefined,
  },
});

export const titleWrapper = recipe({
  base: {
    display: 'flex',
    padding: 20,
  },
  variants: {
    centerTitle: {
      true: {
        justifyContent: 'center',
      },
      false: {
        justifyContent: 'flex-start',
      },
    },
    background: {
      grey: {
        borderBottom: '1px solid #cccccc',
      },
      white: {
        borderBottom: '1px solid #e3e3e3',
      },
      blue: {
        borderBottom: `1px solid ${paletteCss.background.dark}`,
      },
    },
  },
  defaultVariants: {
    centerTitle: false,
  },
});

export const title = recipe({
  base: {},
  variants: {
    background: {
      grey: {
        color: paletteCss.grey[700],
      },
      white: {
        color: paletteCss.grey[700],
      },
      blue: {
        color: paletteCss.common.white,
      },
    },
  },
});

export const content = recipe({
  base: { padding: 20, display: 'flex', flexDirection: 'column' },
  variants: {
    centerContent: {
      true: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      },
      false: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      },
    },
  },
  defaultVariants: {
    centerContent: false,
  },
});

export type RootVariants = RecipeVariants<typeof root>;
export type TitleWrapperVariants = RecipeVariants<typeof titleWrapper>;
export type ContentVariants = RecipeVariants<typeof content>;
