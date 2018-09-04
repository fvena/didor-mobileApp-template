<template lang="pug">
  .auth
    img.auth__logo(alt="Vue logo" src="../assets/logo.svg")

    form.auth__form(@submit.prevent="loginUser")
      input(required v-model="mail" type="email" placeholder="Email")
      input(required v-model="password" type="password" placeholder="Password")
      .auth__error(v-if="error") {{ error }}

      van-button(size="large" type="primary" :loading="status === 'success'") Sign In

    hr.auth__hr

    van-row
      van-col(span="12")
        router-link.auth__link(to="/forgot") Forgot password?
      van-col(span="12")
        router-link.auth__link(to="/register") New here? Sign Up
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      mail: '',
      password: '',
      error: '',
    };
  },
  computed: {
    ...mapGetters({
      status: 'auth/authStatus',
    }),
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),

    loginUser() {
      const user = {
        mail: this.mail,
        password: this.password,
      };

      this.error = '';
      this.login(user)
        .then(() => this.$router.push('/'))
        .catch((error) => {
          // eslint-disable-next-line
          switch (error['_id']) {
            case 'userNotExist':
              this.error = 'No existe ningún usuario registrado con esos datos';
              break;
            default:
              console.log(error);
              this.error = 'Lo sentimos, ocurrió un error, inténtelo más tarde';
          }
        });
    },
  },
};
</script>

<style  lang="scss" scoped>
  h1 {
    color: brand();
  }
</style>
