import { getCookie, getEvent } from 'vinxi/http';

export const langCookie = 'locale';
const defaultLocale = 'en';
const locales = [defaultLocale, 'sv'];

export const getLocale = (req: Request & { cookies?: { [key: string]: string } }): string => {
  'use server';
  let language = '';

  language = getCookie(getEvent(), langCookie) as string;
  if (language) {
    return language;
  } else if (req) {
    language = req.headers?.get('accept-language')?.split(',')?.[0] as string;
  }

  const splittedLanguage = language?.split('-')?.[0];
  return locales.includes(splittedLanguage) ? splittedLanguage : defaultLocale;
};
