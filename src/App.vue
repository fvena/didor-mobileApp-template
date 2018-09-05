<template lang="pug">
  router-view
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    logoutUser() {
      this.logout()
        .then(() => {
          this.$router.push('/login');
        });
    },
  },

  created() {
    this.$http.interceptors.response.use(undefined, err => new Promise(() => {
      // eslint-disable-next-line
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.logout()
          .then(() => {
            this.$router.push('/login');
          });
      }
      throw err;
    }));
  },
});
</script>

<style></style>
