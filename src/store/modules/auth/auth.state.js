const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},
};

export default state;
