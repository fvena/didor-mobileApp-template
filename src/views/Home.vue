<template lang="pug">
  div
    van-nav-bar(
      title="Title"
    )

    .main
      h1 Home Page

      div {{ $t("messages.hello") }}
      div {{ $t("installations.name") }}

      | Unit {{ unit }}
</template>

<script>
import { UNITS } from '@/constant';

export default {
  data() {
    return {
      unitType: 0,
    };
  },
  computed: {
    // a computed getter
    unit() { return `${UNITS[this.unitType]}º`; },
  },
};
</script>
