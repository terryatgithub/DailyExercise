import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/styles/border.css'
import 'amfe-flexible'
import fastClick from 'fastclick'
import router from './router'
import store from './store'
import filters from '@/filters'

import Notice from '@/components/notice'
import QRCodeToast1 from '@/components/qrToast'

Vue.prototype.$Notice = Notice
Vue.prototype.$showQRCodeToast = QRCodeToast1

Vue.config.productionTip = false

fastClick.attach(document.body)

Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
