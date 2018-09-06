const AUTH_REQUEST = (state) => {
  state.status = 'loading';
};

const AUTH_SUCCESS = (state, token, user) => {
  state.status = 'success';
  state.token = token;
  state.user = user;
};

const AUTH_ERROR = (state) => {
  state.status = 'error';
};

const LOGOUT = (state) => {
  state.status = '';
  state.token = '';
};

const AUTH_USER = (state, user) => {
  state.user = user;
};

export default {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  AUTH_USER,
};
