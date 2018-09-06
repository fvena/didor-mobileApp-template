<template lang="pug">
  div
    van-nav-bar(
      :title="title()"
      left-arrow
      @click-left="$router.go(-1)"
    )

    .docs
      keep-alive
        component(:is="currentTabComponent")
</template>

<script>
import i18n from '@/i18n';
import { mapGetters } from 'vuex';

import en_terms from './docs/en.terms.vue'; // eslint-disable-line
import es_terms from './docs/es.terms.vue'; // eslint-disable-line
import en_privacy from './docs/en.privacy.vue'; // eslint-disable-line
import es_privacy from './docs/es.privacy.vue'; // eslint-disable-line

export default {
  components: {
    en_terms,
    es_terms,
    en_privacy,
    es_privacy,
  },
  computed: {
    ...mapGetters({
      language: 'global/language',
    }),
    type() { return this.$route.params.type; },
    currentTabComponent() {
      return `${this.language.toLowerCase()}_${this.type.toLowerCase()}`;
    },
  },
  methods: {
    title() { return i18n.t(`auth.terms.${this.type}`); }, // eslint-disable-line
  },
};
</script>
