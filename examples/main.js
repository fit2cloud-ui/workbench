import Vue from 'vue'
import "@/styles/index.scss"
import App from './App.vue'
import Workbench from "@/index"

Vue.config.productionTip = false

Vue.use(Workbench);


new Vue({
  render: h => h(App),
}).$mount('#app')