<template lang="pug">
  .auth--register
    form.auth__form(@submit.prevent="registerUser")
      input(
        type="text"
        name="name"
        v-model="name"
        v-validate="'required|max:35|min:2'"
        :class="{'error': errors.has('name') }"
        placeholder="First Name"
        autofocus)

      input(
        type="text"
        name="lastName"
        v-model="lastName"
        v-validate="'required|max:35|min:2'"
        :class="{'error': errors.has('lastName') }"
        placeholder="Last Name")

      input(
        type="email"
        name="email"
        v-model="mail"
        v-validate="'required|email'"
        :class="{'error': errors.has('email') }"
        placeholder="Email")

      input(
        type="password"
        name="password"
        v-model="password"
        v-validate="'required|max:64|min:8'"
        :class="{'error': errors.has('password') }"
        placeholder="Password")

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
          :class="{'error': errors.has('toc') }"
          )
        label(for="toc")
          | I accept the
          router-link(to="termUse")  Terms of Use
          |  and the
          router-link(to="privacy")  Privacy Policy
          | .


      .checkbox.margin-quarter-top
        input(
          type="checkbox"
          name="commercial"
          v-model="commercial"
          )
        label(for="commercial")
          | I authorize the DKN Plattform to email me.

      .auth__error.margin-halve-top(v-show="errors.has('toc')") {{ errors.first('toc') }}

      van-button(
        size="large"
        type="primary") Register

    .text--center.margin-top
      router-link.auth__link(to="/auth/login") Go to Login
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$toast.loading({ duration: 0, mask: true, message: 'Cargando...' });
          this.error = '';

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
              this.$toast.clear();
              this.$dialog.alert({
                title: 'Done!',
                message: 'Su cuenta ha sido registrado. Compruebe su correo electrónico para validar su cuenta.',
              }).then(() => {
                this.$router.push('/auth/login');
              });
            })
            .catch((error) => {
              console.log(error);
              this.$toast.clear();

              switch (error['_id']) { // eslint-disable-line
                case 'userNotAvailable':
                  this.$dialog.alert({
                    title: 'Error!',
                    message: 'Ya existe un usuario registrado con este email',
                  });
                  break;
                default:
                  this.$dialog.alert({
                    title: 'Error!',
                    message: 'Lo sentimos, ocurrió un error, inténtelo más tarde.',
                  });
              }
            });
        }
      });
    },
  },
};
</script>
