<template lang="pug">
  .wrapper
    .sidenav(:class="{ open: isOpen }")
      a.closeBtn(@click="closeNav") &times;
      router-link(to="/about") Home
      router-link(to="/about") About
      router-link(to="/about") Logout

    .main
      van-nav-bar(
        title="Title"
        right-text="Button"
        @click-left="openNav"
      )
        van-icon(name="wap-nav" slot="left")

      HelloWorld(msg="Welcome to Your Vue.js App")
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  data() {
    return {
      isOpen: false,
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    closeNav() { this.isOpen = false; },
    openNav() { this.isOpen = true; },
  },
};
</script>

<style lang="scss" scoped>
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    background-color: brand();
    overflow-x: hidden;
    padding-top: $space;
    transition: .5s;

    &.open {
      width: 80%;

      // & ~.main {
      //   margin-left: 80%;
      // }
    }
  }

  .sidenav a {
    height: double($space);
    line-height: double($space);
    color: white;
    padding: 0 $space;
    display: block;
    transition: .3s;
  }

  .closeBtn {
    position: absolute;
    top: 0;
    right: $space;
  }

  .main {
    // width: 100%;
    // transition: margin-left .5s;
    // padding: $space;
  }
</style>
