import i18n from '@/i18n';
import axios from 'axios';
import { Locale } from 'vant';
import { Validator } from 'vee-validate';

import enVant from '@/locales/en/vant';
import esVant from '@/locales/es/vant';

import esVee from 'vee-validate/dist/locale/es';
// import en from 'vee-validate/dist/locale/en'; // No necesario, cargado por defecto


const setLanguage = async ({ commit, state }, lang) => {
  // Compruebo si el idioma seleccionado
  // es distinto al definido.
  if (i18n.locale !== lang) {
    // Compruebo si el idioma seleccionado
    // se encuentra entre los idiomas disponibles
    if (state.languages[lang]) {
      //     // Compruebo si el idioma
      //     // se encuentra entre los idiomas cargados
      //     if (!state.loadedLanguages.includes(lang)) {
      //       const langLocale = await import(`@/locales/${lang}`);
      //       // const elementLocale = await import(`element-ui/lib/locale/lang/${lang}`);
      //
      //       const messages = {
      //         ...langLocale.default,
      //         // ...elementLocale.default,
      //       };
      //
      //       // Añado el nuevo idioma
      //       // a mi lista de idiomas cargados
      //       i18n.setLocaleMessage(lang, messages);
      //       commit('ADD_LOADED_LANGUAGE', lang);
      //     }
      //
      // Defino el nuevo idioma
      commit('SET_LANGUAGE', lang);
      i18n.locale = lang;
      localStorage.setItem('language', lang);
      document.querySelector('html').setAttribute('lang', lang);
      axios.defaults.headers.common['Accept-Language'] = lang;

      switch (lang) {
        case 'es':
          Locale.use('es-ES', esVant);
          Validator.localize('es', esVee);
          break;
        default:
          Locale.use('en-US', enVant);
          Validator.localize('en');
      }
    }
  }
};

export default {
  setLanguage,
};
