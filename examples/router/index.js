import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    component: () => import('../business/Basic.vue'),
  }, {
    path: '/custom',
    component: () => import('../business/Custom.vue'),
  }, ]
});
export default router