<template lang="pug">
  div
    van-nav-bar(
      :title="$t('settings.title')"
    )

    .main
      //- General Sections
      .van-cell-group__title {{ $t("settings.general") }}

      van-cell-group
        van-cell(
          :title="$t('settings.language')"
          :value="lang"
          is-link
          @click="showLanguages = true")
        van-cell(
          :title="$t('settings.units')"
          :value="unit"
          is-link
          @click="showUnits = true")


      //- Popup Select Language
      van-popup.van-popup--full(v-model="showLanguages" position="right" :overlay="false")
        van-nav-bar(
          :title="$t('settings.language')"
          :left-text="$t('settings.general')"
          left-arrow
          @click-left="showLanguages = false"
        )
        van-cell-group
          van-cell(
            v-for="(lang, key) in languages"
            :title="lang"
            :key="key"
            @click="setLang(key)")
            van-icon(
              v-if="key === language"
              slot="right-icon"
              name="success"
              class="van-cell__right-icon text-brand")


      //- Popup Select Unit
      van-popup.van-popup--full(v-model="showUnits" position="right" :overlay="false")
        van-nav-bar(
          :title="$t('settings.units')"
          :left-text="$t('settings.general')"
          left-arrow
          @click-left="showUnits = false"
        )
        van-cell-group
          van-cell(
            v-for="(unitType, key) in units"
            :title="unitName(unitType)"
            :key="key"
            @click="")
            van-icon(
              v-if="parseInt(key) === parseInt(user.units)"
              slot="right-icon"
              name="success"
              class="van-cell__right-icon text-brand")
</template>

<script>
import i18n from '@/i18n';
import { UNITS } from '@/constant';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      unitType: 0,
      showLanguages: false,
      showUnits: false,
      units: UNITS,
    };
  },
  computed: {
    ...mapGetters({
      language: 'global/language',
      languages: 'global/languages',
      user: 'auth/getUser',
    }),
    unit() { return `${UNITS[this.unitType]}º`; },
    lang() { return this.languages[this.language]; },
  },
  methods: {
    ...mapActions({
      setLang: 'global/setLanguage',
    }),
    unitName(unit) { return i18n.t(`settings.unitsName.${unit}`) + ` (º${unit})`; }, // eslint-disable-line
  },
};
</script>
