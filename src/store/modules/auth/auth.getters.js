const isLoggedIn = state => !!state.token;
const authStatus = state => state.status;
const getUser = state => state.user;

export default {
  isLoggedIn,
  authStatus,
  getUser,
};
