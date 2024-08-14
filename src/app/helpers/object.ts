import { toLower } from './string';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isEmpty = (obj: unknown): boolean => !obj || Object.keys(obj).length === 0;

export const isObject = (item: unknown) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const arrayToObject = <T>(array: T[], keyField: keyof T, makeKeyLowerCase = false): Record<keyof T, T> => {
  if (!array) return {} as Record<keyof T, T>;

  return array.reduce(
    (obj, item) => {
      if (!item) return obj;
      const isObject = typeof item === 'object';
      const key = isObject
        ? makeKeyLowerCase
          ? (toLower(item[keyField] as string) as keyof T)
          : (item[keyField] as keyof T)
        : (item as keyof T);

      if (!key) return obj;

      obj[key] = isObject ? (item as T) : ({} as T);

      return obj;
    },
    {} as Record<keyof T, T>,
  );
};

export const mergeDeep = <T extends object>(target: T, source: object): T => {
  const src = Object.assign({}, source);

  if (!isObject(target)) {
    return src as T;
  }

  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const castedKey = key as keyof object;
      if (isObject(source[castedKey])) {
        if (!(key in target)) Object.assign(output, { [key]: source[castedKey] });
        else output[castedKey] = mergeDeep(target[castedKey], source[castedKey]);
      } else {
        Object.assign(output, { [key]: source[castedKey] });
      }
    });
  }
  return output as T;
};
