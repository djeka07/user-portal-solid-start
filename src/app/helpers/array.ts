/* eslint-disable indent */
/* eslint-disable no-restricted-syntax */
export const sort = <T>(arr: T[]): T[] => {
  const sorted = arr.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  return sorted as T[];
};

export const isEmpty = (arr?: unknown[]): boolean => !arr || arr.length === 0;

export const difference = <T>(arrOne: T[], arrTwo: T[]): T[] => {
  if (isEmpty(arrOne)) return [];
  if (isEmpty(arrTwo)) return arrOne;
  const arrOneSet = new Set(arrOne);
  const arrTwoSet = new Set(arrTwo);
  return [...new Set([...arrOneSet].filter((x) => !arrTwoSet.has(x)))];
};

export const sortBy = <T>(arr: T[], propertyToSortBy: keyof T, thenBy: keyof T | null = null): T[] => {
  if (isEmpty(arr)) return [];
  return !propertyToSortBy
    ? sort(arr)
    : [...arr].sort((a, b) => {
        if (a[propertyToSortBy] < b[propertyToSortBy]) return -1;
        if (a[propertyToSortBy] > b[propertyToSortBy]) return 1;
        if (thenBy) {
          if (a[thenBy] < b[thenBy]) return -1;
          if (a[thenBy] > b[thenBy]) return 1;
        }

        return 0;
      });
};

export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_item, index) => arr.slice(index * size, index * size + size));
