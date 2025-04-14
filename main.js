import App from './App'
import i18n from './lang/i18n'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  i18n,  // 在 Vue 2 中直接传入 i18n 实例
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)  // 在 Vue 3 中通过 app.use() 来使用 i18n 插件
  return { app }
}
// #endif
