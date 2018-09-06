<template lang="pug">
  .auth--register
    form.auth__form(@submit.prevent="registerUser")
      input(
        type="text"
        name="name"
        v-model="name"
        v-validate="'required|max:35|min:2'"
        :data-vv-as="$t('auth.name')"
        :class="{'error': errors.has('name') }"
        :placeholder="$t('auth.name')"
        autofocus)

      input(
        type="text"
        name="lastName"
        v-model="lastName"
        v-validate="'required|max:35|min:2'"
        :data-vv-as="$t('auth.lastName')"
        :class="{'error': errors.has('lastName') }"
        :placeholder="$t('auth.lastName')")

      input(
        type="email"
        name="email"
        v-model="email"
        v-validate="'required|email'"
        :data-vv-as="$t('auth.email')"
        :class="{'error': errors.has('email') }"
        :placeholder="$t('auth.email')")

      input(
        type="password"
        name="password"
        v-model="password"
        v-validate="'required|max:64|min:8'"
        :data-vv-as="$t('auth.password')"
        :class="{'error': errors.has('password') }"
        :placeholder="$t('auth.password')")

      .margin-halve-top
        .auth__error(v-show="errors.has('name')") {{ errors.first('name') }}
        .auth__error(v-show="errors.has('lastName')") {{ errors.first('lastName') }}
        .auth__error(v-show="errors.has('email')") {{ errors.first('email') }}
        .auth__error(v-show="errors.has('password')") {{ errors.first('password') }}
        .auth__error(v-show="error") {{ error }}

      .checkbox.margin-top
        input(
          type="checkbox"
          name="toc"
          v-model="toc"
          v-validate="'required'"
          :data-vv-as="$t('auth.terms.terms')"
          :class="{'error': errors.has('toc') }"
          )
        label(for="toc")
          | {{ $t('auth.terms.init') }}
          router-link(:to="localeLink('terms')")  {{ $t('auth.terms.terms') }}
          |  {{ $t('auth.terms.second') }}
          router-link(:to="localeLink('privacy')")  {{ $t('auth.terms.privacy') }}
          | {{ $t('auth.terms.finish') }} {{ lang }}


      .checkbox.margin-quarter-top
        input(
          type="checkbox"
          name="commercial"
          v-model="commercial"
          )
        label(for="commercial")
          | {{ $t('auth.authorize') }}

      .auth__error.margin-halve-top(v-show="errors.has('toc')") {{ errors.first('toc') }}

      van-button(
        size="large"
        type="primary") {{ $t('auth.send') }}

    .text--center.margin-top
      router-link.auth__link(to="/auth/login") {{ $t('auth.goToLogin') }}
</template>

<script>
import i18n from '@/i18n';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      lastName: '',
      email: '',
      password: '',
      toc: false,
      commercial: false,
      error: '',
    };
  },
  computed: {
    ...mapGetters({
      status: 'auth/authStatus',
      lang: 'global/language',
    }),
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
    }),

    localeLink(type) { return `/docs/${type}`; },

    registerUser() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$toast.loading({ duration: 0, mask: true, message: 'Cargando...' });
          this.error = '';

          const data = {
            email: this.mail,
            password: this.password,
            data: {
              name: this.name,
              lastName: this.lastName,
              toc: this.toc,
              commercial: this.commercial,
            },
          };

          this.register(data)
            .then(() => {
              this.$toast.clear();
              this.$dialog.alert({
                title: i18n.t('auth.messages.signUp.title'),
                message: i18n.t('auth.messages.signUp.message'),
              }).then(() => {
                this.$router.push('/auth/login');
              });
            })
            .catch((error) => {
              console.log(error);
              this.$toast.clear();
              const errorId = (error.response && error.response.data) ? error.response.data['_id'] : null; // eslint-disable-line

              switch (errorId) { // eslint-disable-line
                case 'userNotAvailable':
                  this.$dialog.alert({
                    title: i18n.t('auth.messages.errors.userNotAvailable.title'),
                    message: i18n.t('auth.messages.errors.userNotAvailable.message'),
                  });
                  break;
                default:
                  this.$dialog.alert({
                    title: i18n.t('auth.errors.general.title'),
                    message: i18n.t('auth.errors.general.message'),
                  });
              }
            });
        }
      });
    },
  },
};
</script>
