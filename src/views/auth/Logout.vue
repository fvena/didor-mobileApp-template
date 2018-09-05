<template lang="pug">
  .auth--logout
    h3.text--center Your logout success

    .text--center.margin-top
      router-link.auth__link(to="/auth/login") Go to Login
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
