<template lang="pug">
  .sideNav(:class="{'sideNav--open': isOpen, 'sideNav--right': isRight}")
    van-icon.sideNav__openBtn(name="wap-nav" @click="openMenu" v-if="isOpenBtn")

    .sideNav__bar
      nav.sideNav__list
        slot

      van-icon.sideNav__closeBtn(name="clear" @click="closeMenu")

    .sideNav__overlay(@click="closeMenu" v-if="isOverlay")
</template>

<script>
// Se puede lanzar desde el componente padre
// añadiendo una referencia al Sidenav(ref="sideNavTop")
// y luego añadir el método
// methods: {
//   openNavTop() { this.$refs.sideNavTop.openMenu(); }
// }

// TODO: Add more position (top, bottom)
// TODO: Custo icon
// TODO: Add more effects
// https://github.com/mbj36/vue-burger-menu/blob/master/src/components/Menu/reveal.vue

export default {
  name: 'Sidenav',
  data() {
    return {
      isOpen: false,
      isRight: false,
      isOverlay: true,
      isOpenBtn: true,
    };
  },

  props: {
    open: {
      type: Boolean,
      required: false,
    },
    right: {
      type: Boolean,
      required: false,
    },
    disableOpenBtn: {
      type: Boolean,
      required: false,
    },
    disableEsc: {
      type: Boolean,
      required: false,
    },
    disableOverlay: {
      type: Boolean,
      required: false,
    },
    onStateChange: {
      type: Function,
      required: false,
    },
  },

  methods: {
    openMenu() {
      this.isOpen = true;
      // document.body.className += ' body--sideNavOpen';
    },

    closeMenu() {
      this.isOpen = false;
      // document.body.className = document.body.className.replace(
      //   ' body--sideNavOpen',
      //   '',
      // );
    },

    closeMenuOnEsc(e) {
      e = e || window.event;
      if (e.key === 'Escape' || e.keyCode === 27) {
        this.closeMenu();
      }
    },
  },

  mounted() {
    if (this.open) {
      this.openMenu();
    }
    if (this.right) {
      this.isRight = true;
    }
    if (this.disableOverlay) {
      this.isOverlay = false;
    }
    if (this.disableOpenBtn) {
      this.isOpenBtn = false;
    }
    if (!this.disableEsc) {
      document.addEventListener('keyup', this.closeMenuOnEsc);
    }
  },

  destroyed() {
    document.removeEventListener('keyup', this.closeMenuOnEsc);
  },
};
</script>

<style scoped lang="scss">
  .sideNav__bar {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    left: 0;
    background-color: brand();
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: $space; /* Place content 60px from the top */
    transition: .5s; /*0.5 second transition effect to slide in the sidenav*/
  }

  .sideNav--open {
    .sideNav__bar {
      width: 90%;
      max-width: 350px;
    }

    .sideNav__overlay {
      width: 100%;
      opacity: 1;
    }
  }

  .sideNav--right {
    .sideNav__bar {
      left: auto;
      right: 0;
    }

    .sideNav__openBtn {
      left: auto;
      right: halve($space);
    }
  }

  .sideNav__overlay {
    background: rgba(0, 0, 0, 0.8);
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 999; /* Stay on top */
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity .5s; /*0.5 second transition effect to slide in the sidenav*/
  }

  .sideNav__list > * {
    height: double($space);
    line-height: double($space);
    color: white;
    padding: 0 $space;
    display: block;
    transition: .3s;
    cursor: pointer;
  }

  .sideNav__openBtn {
    position: absolute;
    top: halve($space);
    left: halve($space);
    color: brand();
    z-index: 998;
  }

  .sideNav__closeBtn {
    color: white;
    position: absolute;
    top: halve($space);
    right: halve($space);
    cursor: pointer;
  }
</style>
