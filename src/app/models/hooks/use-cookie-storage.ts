import { isServer } from 'solid-js/web';
import { getCookie, getEvent } from 'vinxi/server';

type UseCookieStorageReturn<T> = {
  getItem: (name: string) => T | undefined;
  setItem: (name: string, value: T) => void;
};

const getCookieFromDocument = (name: string) => {
  const regex = new RegExp(`(^| )${name}=([^;]+)`);
  const match = document.cookie.match(regex);
  if (match) {
    return match[2];
  }
  return '';
};

export const useCookieStorage = <T>(): UseCookieStorageReturn<T> => {
  const getItem = (name: string): T | undefined => {
    try {
      const cookie = () => (isServer ? getCookie(getEvent(), name) : getCookieFromDocument(name));
      return JSON.parse(cookie()!);
    } catch (error) {
      return undefined;
    }
  };

  const setItem = (name: string, value: T): void => {
    try {
      document.cookie = `${name}=${JSON.stringify(value)};path=/`;
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem };
};
