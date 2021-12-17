import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import EmployeeManager from '@/components/EmployeeManager'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/employee-manager',
      name: 'EmployeeManager',
      component: EmployeeManager,
    }
  ]
})

export default router