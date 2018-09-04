<template lang="pug">
.auth
  img.auth__logo(alt="Vue logo" src="../assets/logo.svg")

  form.auth__form(@submit.prevent="forgotUser")
    input(required v-model="mail" type="email" placeholder="Email")
    .auth__error(v-if="error") {{ error }}

    van-button(size="large" type="primary" :loading="status === 'success'") Send

  hr.auth__hr

  .text--center.margin-top
    router-link.auth__link(to="/login") Go to Login
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
