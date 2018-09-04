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

export default {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
};
