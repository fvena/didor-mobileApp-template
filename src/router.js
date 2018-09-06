import Vue from 'vue';
import Router from 'vue-router';

// Auth vies
import Auth from './views/auth/Auth.vue';
import Login from './views/auth/Login.vue';
import Register from './views/auth/Register.vue';
import Forgot from './views/auth/Forgot.vue';
import Logout from './views/auth/Logout.vue';
import Docs from './views/auth/Docs.vue';

// Views
import Main from './views/Main.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Settings from './views/Settings.vue';

import state from './store/modules/auth/auth.state';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home',
      },
    },
    {
      path: '/docs/:type',
      name: 'docs',
      component: Docs,
    },
    {
      path: '/auth',
      component: Auth,
      redirect: {
        name: 'login',
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
        },
        {
          path: 'forgot',
          name: 'forgot',
          component: Forgot,
        },
        {
          path: 'logout',
          name: 'logout',
          component: Logout,
        },
      ],
    },

    // Authenticate routes
    {
      path: '/main',
      component: Main,
      redirect: {
        name: 'home',
      },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          path: 'about',
          name: 'about',
          component: About,
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (state.token) {
      next();
      return;
    }
    next('/auth/login');
  } else {
    next();
  }
});

export default router;
