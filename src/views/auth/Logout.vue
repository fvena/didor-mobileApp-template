<template lang="pug">
  .auth
    img.auth__logo(alt="Vue logo" src="@/assets/logo.svg")

    h3.text--center Your logout success

    .text--center.margin-top
      router-link.auth__link(to="/login") Go to Login
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
  },
  created() {
    this.logout();
  },
};
</script>
