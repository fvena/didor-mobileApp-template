<template lang="pug">
  div
    h1 Sign in {{ status }}

    form.login(@submit.prevent="loginUser")
      label(for="mail") Email
      input(required v-model="mail" type="email" placeholder="Email")

      label(for="password") Password
      input(required v-model="password" type="password" placeholder="Password")

      hr

      button(type="submit") Login

    | {{ error }}

    router-link(to="/register") Registrar |
    router-link(to="/remember") Recordar |
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      mail: 'fvena@altracorporacion.es',
      password: 'password',
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
