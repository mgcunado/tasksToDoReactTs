import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

interface I18nOptions extends InitOptions {
  fallbackLng: string[];
}

const i18nOptions: I18nOptions = {
  lng: 'es',
  fallbackLng: ['en', 'es'],
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(initReactI18next).init(i18nOptions);

export default i18n;
