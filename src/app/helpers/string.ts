export const toLower = (str: string): string => (!str ? '' : str.toLowerCase());
export const removeAllWhiteSpace = (str: string): string => (!str ? '' : str.replace(/\s+/g, ''));

export const toBool = (val: string): boolean => {
  if (!val) return false;
  const num = +val;
  return !isNaN(num) ? !!num : val.toLowerCase() === 'true';
};

export const subString = (str: string | undefined, length: number, endChars = '...'): string => {
  if (!str) return '';
  if (!length) return str;
  if (str.length <= length) return str;
  return `${str.substring(0, length)}${endChars}`;
};

export const isNullOrEmpty = (str: string): boolean => {
  if (!str) return true;
  const trimmed = str.trim();
  return trimmed === '';
};

export const escapeRegExp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const replaceAll = (str: string, find: string, replace: string): string =>
  !str ? '' : str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

export const toUpper = (str: string): string => (!str ? '' : str.toUpperCase());

export const toCamelCase = (str: string) => {
  if (isNullOrEmpty(str)) {
    return '';
  }
  return str.replace(/^([A-Z])|\s(\w)/g, (match, p1, p2) => (!!p2 ? p2.toUpperCase() : p1.toLowerCase()));
};
