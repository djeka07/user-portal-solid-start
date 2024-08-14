import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import fontCss from '../../../../../app/styles/font.css';
import media from '../../../../../app/styles/media.css';
import paletteCss from '../../../../../app/styles/palette.css';

export const messages = style({
  flexGrow: 1,
  overflowY: 'auto',
});

export const conversationItem = recipe({
  base: {
    padding: '10px 10px 10px 10px',
    cursor: 'pointer',

    height: 72,
    position: 'relative',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    transition: '0.3s background ease-in-out',
    selectors: {
      '&&&': {
        color: 'white',
      },
    },
  },
  variants: {
    selected: {
      true: { backgroundColor: 'rgba(0,0,0, 0.2)' },
      false: {
        ':hover': {
          transition: '0.3s background ease-in-out',
          backgroundColor: 'rgba(50,50,50, 0.5)',
        },
      },
    },
  },

  defaultVariants: {
    selected: undefined,
  },
});

export const conversationName = style({
  wordBreak: 'break-all',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
});

export const lastMessageWrapper = style({
  display: 'none',
  [media.base]: {
    [media.small.up]: {
      display: 'block',
      overflow: 'hidden',
    },
  },
});

export const lastMessageTime = style({
  fontSize: fontCss.size.xsmall,
  color: paletteCss.grey[500],
});

export const lastMessage = style({
  fontSize: fontCss.size.small,
  color: paletteCss.grey[300],
});

export const numberOfConversations = style({
  textAlign: 'center',
  color: 'white',
  marginTop: 10,
  paddingTop: 10,
  borderTop: `1px solid ${paletteCss.grey[400]}`,
  fontSize: 'var(--font-size-small)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 4,
  paddingRight: 4,
});

export const skeletonRoot = style({
  display: 'flex',
  padding: 8,
  height: 72,
  gap: 4,
});

export const skeletonContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flex: 1,
});
