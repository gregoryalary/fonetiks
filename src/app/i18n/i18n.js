// i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Locales
import fr from './locales/fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: fr,
      },
    },
    lng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
