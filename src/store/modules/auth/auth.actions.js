import axios from 'axios';


const login = ({ commit }, user) => new Promise((resolve, reject) => {
  commit('AUTH_REQUEST');

  axios({ url: 'auth/login', data: user, method: 'POST' })
    .then((resp) => {
      // Get user data
      const { token, data: userData } = resp.data;
      const { units, language } = resp.data.scope.dknUsa;

      userData.language = language;
      userData.units = units;

      // Store data
      localStorage.setItem('token', `Bearer ${token}`);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      commit('AUTH_SUCCESS', `Bearer ${token}`, userData);

      // Return success
      resolve(userData);
    })
    .catch((error) => {
      console.log(error);
      commit('AUTH_ERROR');
      localStorage.removeItem('token');
      reject(error);
    });
});


const register = ({ commit }, user) => new Promise((resolve, reject) => {
  commit('AUTH_REQUEST');

  axios({ url: 'auth/signup/dknUsa', data: user, method: 'POST' })
    .then((resp) => {
      resolve(resp.data);
    })
    .catch((error) => {
      commit('AUTH_ERROR');
      localStorage.removeItem('token');
      reject(error);
    });
});


const forgot = ({ commit }, user) => new Promise((resolve) => {
  commit('AUTH_REQUEST');

  resolve(user);
});


const logout = ({ commit }) => new Promise((resolve) => {
  commit('LOGOUT');
  localStorage.removeItem('token');
  delete axios.defaults.headers.common.Authorization;
  resolve();
});


const getUser = ({ commit }) => new Promise((resolve, reject) => {
  axios({ url: 'users/isLoggedIn', method: 'GET' })
    .then((resp) => {
      // Get user data
      const { data: userData } = resp.data;
      const { units, language } = resp.data.scope.dknUsa;

      userData.language = language;
      userData.units = units;

      // Store data
      commit('AUTH_USER', userData);

      // Return success
      resolve(userData);
    })
    .catch((error) => {
      commit('AUTH_ERROR');
      reject(error);
    });
});


export default {
  login,
  register,
  forgot,
  logout,
  getUser,
};
