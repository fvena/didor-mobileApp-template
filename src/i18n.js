import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([a-z0-9]+)\./i);
    if (matched && matched.length > 1) {
      const split = matched.input.split('/');
      const locale = split[1];
      const section = matched[1];
      if (!messages[locale]) {
        messages[locale] = {};
      }
      messages[locale][section] = locales(key);
    }
  });

  return messages;
}

export default new VueI18n({
  locale: localStorage.getItem('language') || navigator.language || process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
