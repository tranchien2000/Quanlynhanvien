import Vue from 'vue'
import App from './App'
import router from './router/router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Datatable from 'vue2-datatable-component'
import './filter/moment'
Vue.use(BootstrapVue)
Vue.use(Datatable)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");