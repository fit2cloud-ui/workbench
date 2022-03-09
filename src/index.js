import Workbench from './Workbench'
const plugin = {
  install: function (Vue) {
    Vue.component(Workbench.name, Workbench)
  }
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin