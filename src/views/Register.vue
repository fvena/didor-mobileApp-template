<template lang="pug">
  div
    h1 Register {{ status }}
    form(@submit.prevent="registerUser")
      label(for="name") Name
      input(id="name" type="text" v-model="name" required autofocus)

      label(for="lastName") Last Name
      input(id="lastName" type="text" v-model="lastName" required)

      label(for="email") E-Mail Address
      input(id="mail" type="email" v-model="mail" required)

      label(for="password") Password
      input(id="password" type="password" v-model="password" required)

      label(for="toc") TOC
      input(id="toc" type="checkbox" v-model="toc" required)

      label(for="commercial") Comercial
      input(id="commercial" type="checkbox" v-model="commercial")

      hr

      button(type="submit") Register

    | {{ error }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: 'Juan',
      lastName: 'Altra',
      mail: 'juan@altracorporacion.es',
      password: 'password',
      toc: true,
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
