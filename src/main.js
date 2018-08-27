import 'material-design-icons/iconfont/material-icons.css';
import 'vuetify/dist/vuetify.css';
import 'babel-polyfill';
import Vue from 'vue';
import vuetify from 'vuetify';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import cordovaLoader from './cordovaLoader';


Vue.config.productionTip = false;

Vue.use(vuetify);

cordovaLoader(() => {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app');
});
