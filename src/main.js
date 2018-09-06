import 'babel-polyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import cordovaLoader from './cordovaLoader';
import './plugins/axios';
import './plugins/vant';
import './plugins/vee-validate';
import './styles/didor.scss';


Vue.config.productionTip = false;

cordovaLoader(() => {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app');
});
