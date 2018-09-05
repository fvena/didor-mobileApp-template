<template lang="pug">
  .auth--login
    form.auth__form(@submit.prevent="loginUser")
      input(
        type="email"
        name="email"
        v-model="mail"
        v-validate="'required|email'"
        :class="{'error': errors.has('email') }"
        placeholder="Email")
      input(
        type="password"
        name="password"
        v-model="password"
        v-validate="'required'"
        :class="{'error': errors.has('password') }"
        placeholder="Password")

      .margin-halve-top
        .auth__error(v-show="errors.has('email')") {{ errors.first('email') }}
        .auth__error(v-show="errors.has('password')") {{ errors.first('password') }}
        .auth__error(v-show="error") {{ error }}

      van-button(
        size="large"
        type="primary"
        native-type="submit") Sign In

    hr.auth__hr

    van-row
      van-col(span="12")
        router-link.auth__link(to="/auth/forgot") Forgot password?
      van-col(span="12")
        router-link.auth__link(to="/auth/register") New here? Sign Up
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$toast.loading({ duration: 0, mask: true, message: 'Cargando...' });
          this.error = '';

          const user = {
            mail: this.mail,
            password: this.password,
          };

          this.login(user)
            .then(() => {
              this.$toast.clear();
              this.$router.push('/');
            })
            .catch((error) => {
              this.$toast.clear();

              switch (error['_id']) { // eslint-disable-line
                case 'userNotExist':
                  this.error = 'No existe ningún usuario registrado con esos datos';
                  break;
                default:
                  console.log(error);
                  this.$dialog.alert({
                    title: 'Error!',
                    message: 'Lo sentimos, ocurrió un error, inténtelo más tarde.',
                  });
              }
            });
        }
      });
    },
  },
};
</script>
