import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '@/page/admin/dashboard/index.vue';
import ArticleList from '@/page/admin/list.vue';

Vue.use(VueRouter);

export default function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '/',
        component: Dashboard
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      {
        path: '/article/add',
        component: () => import('@/page/admin/write/index.vue')
      },
      {
        path: '/article/detail/:id',
        component: () => import('@/page/admin/detail.vue')
      },
      {
        path: '*', component: () => import('@/page/admin/notfound.vue')
      }
    ]
  });

  router.beforeEach((route, redirec, next) => {
    next();
  });

  router.afterEach((route, redirec) => {
    if (EASY_ENV_IS_BROWSER && route.matched && route.matched.length) {
      const matchComponent = route.matched[0].components.default;
      const asyncData = matchComponent.methods && matchComponent.methods.fetchApi;
      if (asyncData) {
        console.log('router afterEach trigger asyncData', route);
        asyncData(router.app.$store, route);
      }
    }
  });

  return router;
}