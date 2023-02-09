import Vue from 'vue'
import App from './App'

import uView from "uview-ui"
import api from "@/config/api.js"

Vue.use(uView)

Vue.config.productionTip = false
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
