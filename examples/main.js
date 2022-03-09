import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Workbench from "@/index"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/fonts/iconfont.css"
import "./styles/index.scss"


Vue.config.productionTip = false

Vue.use(Workbench);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')