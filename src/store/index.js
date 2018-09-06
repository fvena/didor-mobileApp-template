import Vue from 'vue';
import Vuex from 'vuex';
import globalModule from './modules/global';
import authModule from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global: globalModule,
    auth: authModule,
  },
});
