<template lang="pug">
  .auth--login
    form.auth__form(@submit.prevent="loginUser")
      input(
        type="email"
        name="email"
        v-model="email"
        v-validate="'required|email'"
        :data-vv-as="$t('auth.email')"
        :class="{'error': errors.has('email') }"
        :placeholder="$t('auth.email')")
      input(
        type="password"
        name="password"
        v-model="password"
        v-validate="'required'"
        :data-vv-as="$t('auth.password')"
        :class="{'error': errors.has('password') }"
        :placeholder="$t('auth.password')")

      .margin-halve-top
        .auth__error(v-show="errors.has('email')") {{ errors.first('email') }}
        .auth__error(v-show="errors.has('password')") {{ errors.first('password') }}
        .auth__error(v-show="error") {{ error }}

      van-button(
        size="large"
        type="primary"
        native-type="submit") {{ $t('auth.send')}}

    hr.auth__hr

    van-row
      van-col(span="12")
        router-link.auth__link(to="/auth/forgot") {{ $t('auth.forgot') }}
      van-col(span="12")
        router-link.auth__link(to="/auth/register") {{ $t('auth.signUpLink') }}
</template>

<script>
import i18n from '@/i18n';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
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
            email: this.email,
            password: this.password,
          };

          this.login(user)
            .then(() => {
              this.$toast.clear();
              this.$router.push('/');
            })
            .catch((error) => {
              this.$toast.clear();
              const errorId = (error.response && error.response.data) ? error.response.data['_id'] : null; // eslint-disable-line

              switch (errorId) {
                case 'userNotExist':
                  this.error = i18n.t('auth.errors.notValid');
                  break;
                default:
                  this.$dialog.alert({
                    title: i18n.t('auth.errors.general.title'),
                    message: i18n.t('auth.errors.general.message'),
                  });
              }
            });
        }
      });
    },
  },
};
</script>
