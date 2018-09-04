import 'babel-polyfill';
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import Vant from 'vant';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import cordovaLoader from './cordovaLoader';

Vue.use(Vant);


Vue.config.productionTip = false;

cordovaLoader(() => {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app');
});
