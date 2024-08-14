export const tryParse = <T>(str: string): T => {
  try {
    return JSON.parse(str);
  } catch {
    return {} as T;
  }
};
