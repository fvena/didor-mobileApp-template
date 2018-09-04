import axios from 'axios';


const login = ({ commit }, user) => new Promise((resolve, reject) => {
  commit('AUTH_REQUEST');

  axios({ url: 'auth/login', data: user, method: 'POST' })
    .then((resp) => {
      // Get user data
      const { token, data: userData, _id: mail } = resp.data;
      const { units, language } = resp.data.scope.dknUsa;

      userData.mail = mail;
      userData.language = language;
      userData.units = units;

      // Store data
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = token;
      commit('AUTH_SUCCESS', token, userData);

      // Return success
      resolve(resp);
    })
    .catch((error) => {
      commit('AUTH_ERROR');
      localStorage.removeItem('token');
      reject(error.response.data);
    });
});


const register = ({ commit }, user) => new Promise((resolve, reject) => {
  commit('AUTH_REQUEST');

  axios({ url: 'auth/signup/dknUsa', data: user, method: 'POST' })
    .then((resp) => {
      // Get user data
      // console.log(resp);
      // const { token, userData } = resp.data.token;

      // Store data
      // localStorage.setItem('token', token);
      // axios.defaults.headers.common.Authorization = token;
      // commit('AUTH_SUCCESS', token, userData);

      // Return success
      resolve(resp.data);
    })
    .catch((error) => {
      commit('AUTH_ERROR');
      localStorage.removeItem('token');
      reject(error.response.data);
    });
});

const logout = ({ commit }) => new Promise((resolve) => {
  commit('LOGOUT');
  localStorage.removeItem('token');
  delete axios.defaults.headers.common.Authorization;
  resolve();
});


export default {
  login,
  register,
  logout,
};
