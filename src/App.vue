<template lang="pug">
  router-view
</template>

<script>
import Vue from 'vue';
import i18n from '@/i18n';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  ...mapGetters({
    user: 'auth/getUser',
  }),
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      getUser: 'auth/getUser',
    }),
    logoutUser() {
      this.logout()
        .then(() => {
          this.$router.push('/auth/login');
        });
    },
    getUserData() {
      this.getUser()
        .then()
        .catch(() => {
          this.$dialog.alert({
            title: i18n.t('auth.errors.general.title'),
            message: i18n.t('auth.errors.general.message'),
          }).then(() => {
            this.$router.push('/auth/login');
          });
        });
    },
  },

  created() {
    this.$http.interceptors.response.use(undefined, err => new Promise(() => {
      // eslint-disable-next-line
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.logout()
          .then(() => {
            this.$router.push('/auth/login');
          });
      }
      throw err;
    }));

    if (!this.user) {
      this.getUserData();
    }
  },
});
</script>

<style></style>
