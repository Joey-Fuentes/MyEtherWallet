import Router from 'vue-router';
import store from '@/store';
import { getMode, getRoutes } from '@/builds/configs';

const router = new Router({
  mode: getMode(),
  routes: getRoutes(),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
    window.scrollTo(0, 0);
  }
});

router.beforeResolve((to, ___, next) => {
  console.log();
  if (
    to.hasOwnProperty('meta') &&
    to.meta.hasOwnProperty('requiresAuth') &&
    to.meta.requiresAuth === false
  ) {
    next();
  } else {
    if (Object.keys(to.query).length > 1) {
      store.dispatch('saveQueryVal', to.query);
    }
    if (store.state.wallet === null) {
      store.dispatch('setLastPath', to.path);
      next({ name: 'AccessWalletLayout' });
    } else {
      if (store.state.path !== '') {
        const localPath = store.state.path;
        store.dispatch('setLastPath', '');
        next({ path: localPath });
      } else {
        next();
      }
    }
  }
});

export default router;
