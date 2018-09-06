<template lang="pug">
  div
    Sidenav
      router-link(to="/") {{ $t('sidenav.home') }}
      router-link(to="/main/about") {{ $t('sidenav.about') }}
      router-link(to="/main/settings") {{ $t('sidenav.settings') }}
      router-link(to="/auth/logout") {{ $t('sidenav.logout') }}

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
