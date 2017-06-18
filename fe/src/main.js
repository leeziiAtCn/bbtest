// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from 'javascripts/router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'reset.css/reset.css'
import axios  from 'javascripts/http'
import 'static/less/base.less'

Vue.prototype.$http = axios
const router = new VueRouter({
  routes
})
Vue.use(ElementUI)
Vue.use(VueRouter);
new Vue({
  router
}).$mount('#app');
