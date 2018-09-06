<template lang="pug">
  .auth--logout
    h3.text--center {{ $t('auth.messages.logout') }}

    .text--center.margin-top
      router-link.auth__link(to="/auth/login") {{ $t('auth.goToLogin') }}
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
