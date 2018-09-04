<template lang="pug">
  .auth
    img.auth__logo(alt="Vue logo" src="../assets/logo.svg")

    form.auth__form(@submit.prevent="registerUser")
      input(id="name" type="text" v-model="name" placeholder="First Name" required autofocus)
      input(id="lastName" type="text" v-model="lastName" placeholder="Last Name" required)
      input(id="mail" type="email" v-model="mail" placeholder="Email" required)
      input(id="password" type="password" v-model="password" placeholder="Password" required)
      .auth__error(v-if="error") {{ error }}

      van-checkbox.margin-top(v-model="toc" shape="square")
        | I accept the
        router-link(to="termUse")  Terms of Use
        |  and the
        router-link(to="privacy")  Privacy Policy
        | .

      van-checkbox(v-model="commercial" shape="square")
        | I authorize the DKN Plattform to email me.

      van-button(size="large" type="primary" :loading="status === 'success'") Register

    .text--center.margin-top
      router-link.auth__link(to="/login") Go to Login
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      lastName: '',
      mail: '',
      password: '',
      toc: false,
      commercial: false,
      error: '',
    };
  },
  computed: {
    ...mapGetters({
      status: 'auth/authStatus',
    }),
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
    }),

    registerUser() {
      const data = {
        mail: this.mail,
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
          console.log('success register');
          this.$router.push('/login');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
