<template>
  <AdminLayout :title="$store.state.title">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </AdminLayout>
</template>
<script type="text/babel">
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import createI18n from '@/framework/i18n/admin';
import store from '@/store/admin';
import router from '@/router/admin';
import AdminLayout from '@/layout/admin';

Vue.use(VueI18n);
Vue.use(ElementUI);

export default {
  router,
  store,
  components: {
    AdminLayout,
  },
  computed: {
    // title() {
    //   return this.$store.state.title;
    // }
  },
  hook :{
    render(context, options) {
      const i18n = createI18n(context.state.locale);
      options.i18n = i18n;
    }
  },
  mounted() {},
};
</script>
