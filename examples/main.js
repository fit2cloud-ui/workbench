import Vue from 'vue'
import "@/styles/index.scss"
import App from './App.vue'
import Workbench from "@/index"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Workbench);
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')