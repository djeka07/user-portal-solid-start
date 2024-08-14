import * as i18n from '@solid-primitives/i18n';
import { Meta, Title } from '@solidjs/meta';
import dayjs from 'dayjs';
import {
  JSX,
  ParentComponent,
  createContext,
  createEffect,
  createResource,
  createSignal,
  startTransition,
  useContext,
} from 'solid-js';
import { getEvent, setCookie } from 'vinxi/http';
import { langCookie } from '~/app/helpers/locale';
import { dict as en_dict } from '~/locales/en';

type RawDictionary = typeof en_dict;

export type Locale = 'en' | 'sv';

type DeepPartial<T> = T extends Record<string, unknown> ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

const raw_dict_map: Record<Locale, () => Promise<{ dict: DeepPartial<RawDictionary> }>> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  en: () => null as any, // en is loaded by default
  sv: () => import('../../../locales/sv'),
};

export type Dictionary = i18n.Flatten<RawDictionary>;

const en_flat_dict: Dictionary = i18n.flatten(en_dict);

interface I18nActions {
  t: i18n.Translator<Dictionary>;
  getLocale(): Locale;
  setLocale(value: Locale): void;
}

type I18nContext = [I18nActions];

const initialI18nContext: I18nContext = [
  {
    getLocale() {
      throw Error('I18n provider getLocale was not assigned');
    },
    setLocale: () => {
      throw Error('I18n provider setLocale was not assigned');
    },
    t: () => {
      throw Error('I18n provider t was not assigned');
    },
  },
];

const fetchDictionary = async (locale: Locale): Promise<Dictionary> => {
  if (locale === 'en') return en_flat_dict;

  const { dict } = await raw_dict_map[locale]();
  const flat_dict = i18n.flatten(dict) as RawDictionary;
  return { ...en_flat_dict, ...flat_dict };
};

const I18nContext = createContext<I18nContext>(initialI18nContext);

export const useI18n = () => useContext(I18nContext);

type I18nProps = {
  children?: JSX.Element;
  defaultLanguage: Locale;
};

const setCookieLang = (value: string) => {
  'use server';
  setCookie(getEvent(), langCookie, value);
};

export const I18nContextProvider: ParentComponent<I18nProps> = (props: I18nProps) => {
  const [language, setLanguage] = createSignal(props.defaultLanguage);
  dayjs.locale(props.defaultLanguage);

  const [dict] = createResource(language, fetchDictionary, { initialValue: en_flat_dict });

  const t = i18n.translator(dict, i18n.resolveTemplate);

  createEffect(() => {
    dayjs.locale(language());
  });

  const state: I18nContext = [
    {
      getLocale: () => language(),
      setLocale(value: Locale) {
        void startTransition(() => {
          setLanguage(value);
          setCookieLang(value);
        });
      },
      t,
    },
  ];

  return (
    <I18nContext.Provider value={state}>
      <Title>{t('common.title')}</Title>
      <Meta name="lang" content={language()} />
      {props.children}
    </I18nContext.Provider>
  );
};
