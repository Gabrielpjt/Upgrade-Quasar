import { createRouter, createWebHistory } from 'vue-router'; // Vue 3 syntax
import routes from './routes';
import init from '../store';

const store = init({}); // initialize the store

export default function() {
  const router = createRouter({
    history: createWebHistory(process.env.VUE_ROUTER_BASE), // Vue 3 uses createWebHistory
    routes,
    scrollBehavior: () => ({ x: 0, y: 0 }), // scroll behavior
    duplicateNavigationPolicy: 'ignore'
  });

  let unauthorized = false;

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters['user/isAuthenticated']) {
        next();
      } else {
        next({ name: 'login' });
      }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
      if (store.getters['user/isAuthenticated'] && !unauthorized) {
        next({ name: 'admin-home' });
      } else {
        next();
      }
    } else if (to.matched.some(record => !!record.meta.requiresPermission)) {
      const guardedRoutes = to.matched.filter(record => !!record.meta.requiresPermission);

      unauthorized = false;

      guardedRoutes.forEach(gr => {
        if (!store.getters['user/hasPermission'](gr.meta.requiresPermission)) {
          unauthorized = true;
        }
      });

      if (unauthorized) {
        next({ name: 'login-sso' });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return router;
}
