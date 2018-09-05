<template lang="pug">
  div
    Sidenav
      router-link(to="/") Home
      router-link(to="/main/about") About
      router-link(to="/auth/logout") Logout

    router-view
</template>

<script>
import Sidenav from '@/components/Sidenav.vue';

export default {
  components: {
    Sidenav,
  },
};
</script>
