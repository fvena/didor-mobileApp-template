<template lang="pug">
  div
    Sidenav
      router-link(to="/") Home
      router-link(to="/about") About
      router-link(to="/logout") Logout

    van-nav-bar(
      title="Title"
    )

    .main
      h1 Welcome to Your Vue.js App
</template>

<script>
import Sidenav from '@/components/Sidenav.vue';

export default {
  components: {
    Sidenav,
  },
};
</script>
