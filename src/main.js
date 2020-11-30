import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss' // global css

import router from './router'
import store from './store'

import './icons' // 自动渲染svg

Vue.use(ElementUI)


import VeLine from 'v-charts/lib/line'
Vue.component(VeLine.name, VeLine)

Vue.config.productionTip = false

window.App = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')