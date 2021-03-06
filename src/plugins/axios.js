import Vue from 'vue';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post.Accept = 'application/json';


Vue.prototype.$http = axios;

// If user active session, get token
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
}


const configAxios = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const axiosInstance = axios.create(configAxios);

axiosInstance.interceptors.request.use(
  config =>
    // Do something before request is sent
    config
  ,
  error =>
    // Do something with request error
    Promise.reject(error)
  ,
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response =>
    // Do something with response data
    response
  ,
  error =>
    // Do something with response error
    Promise.reject(error)
  ,
);

// eslint-disable-next-line
Plugin.install = (Vue, options) => {
  Vue.axios = axiosInstance; // eslint-disable-line
  window.axios = axiosInstance;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axiosInstance;
      },
    },
    $axios: {
      get() {
        return axiosInstance;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
