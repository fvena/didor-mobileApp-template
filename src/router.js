import Vue from 'vue';
import Router from 'vue-router';

// Auth vies
import Login from './views/auth/Login.vue';
import Register from './views/auth/Register.vue';
import Forgot from './views/auth/Forgot.vue';
import Logout from './views/auth/Logout.vue';
import Privacy from './views/auth/Privacy.vue';
import TermUse from './views/auth/TermUse.vue';

// Views
import Home from './views/Home.vue';
import About from './views/About.vue';

import state from './store/modules/auth/auth.state';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: Forgot,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy,
    },
    {
      path: '/termUse',
      name: 'termUse',
      component: TermUse,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (state.token) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
