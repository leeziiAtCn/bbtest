import Vue from 'vue'
import App from './App.vue'
import routes from 'javascripts/router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'reset.css/reset.css'
import axios from 'javascripts/http'
import 'statics/less/base.less'
import store from 'javascripts/store'
Vue.prototype.$http = axios
const router = new VueRouter({
  routes
})
Vue.use(ElementUI)
Vue.use(VueRouter)
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})