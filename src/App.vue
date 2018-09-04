<template lang="pug">
  div
    //-
      van-nav-bar(
        title="Title"
        left-text="Back"
        right-text="Button"
        left-arrow
      )
      router-link(to="/") Home |
      router-link(to="/about") About
      span(v-if="isLoggedIn")
        | |
        a(@click="logoutUser") Logout

    router-view
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },

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
