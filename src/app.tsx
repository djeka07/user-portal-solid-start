/* eslint-disable prefer-rest-params */
// @refresh reload
import './app.css';

import { MetaProvider } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import 'dayjs/locale/en';
import 'dayjs/locale/sv';
import { Suspense } from 'solid-js';
import { getRequestEvent, isServer } from 'solid-js/web';
import { getLocale } from './app/helpers/locale';
import { I18nContextProvider, Locale } from './app/models/contexts/i18n.context';
import { PanelsProvider } from './app/models/contexts/panel.context';

export default function Root() {
  const language = isServer ? getLocale(getRequestEvent()!.request) : document.documentElement.lang;
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <I18nContextProvider defaultLanguage={language as Locale}>
            <PanelsProvider>
              <Suspense>{props.children}</Suspense>
            </PanelsProvider>
          </I18nContextProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
