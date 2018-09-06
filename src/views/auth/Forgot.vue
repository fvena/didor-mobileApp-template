<template lang="pug">
  .auth--forgot
    form.auth__form(@submit.prevent="forgotUser")
      input(
        type="email"
        name="email"
        v-model="email"
        v-validate="'required|email'"
        :data-vv-as="$t('auth.email')"
        :class="{'error': errors.has('email') }"
        :placeholder="$t('auth.email')")

      .margin-halve-top
        .auth__error(v-show="errors.has('email')") {{ errors.first('email') }}

      van-button(
        size="large"
        type="primary"
        native-type="submit") {{ $t('auth.send')}}

    hr.auth__hr

    .text--center.margin-top
      router-link.auth__link(to="/auth/login") {{ $t('auth.goToLogin')}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      mail: '',
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
      forgot: 'auth/forgot',
    }),

    forgotUser() {
      const data = {
        mail: this.mail,
      };

      this.forgot(data)
        .then(() => {
          console.log('success password recovery');
          // this.$router.push('/login');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
