export const isEnterWithoutShift = (event: KeyboardEvent): boolean => isEnter(event) && !isShiftKey(event);
export const isEnterWithShift = (event: KeyboardEvent): boolean => isEnter(event) && isShiftKey(event);
export const isEnter = (event: KeyboardEvent): boolean => event.key === 'Enter';
export const isShiftKey = (event: KeyboardEvent): boolean => event.shiftKey;
export const isSpace = (event: KeyboardEvent): boolean => event.code === 'Space';
export const isBackSpace = (event: KeyboardEvent) => event.key === 'Backspace';
export const isEscape = (event: KeyboardEvent) => event.key === 'Escape';
