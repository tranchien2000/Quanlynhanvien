import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import EmployeeManager from '@/components/EmployeeManager'
import ShiftReport from '@/components/ShiftReport'
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
    },
    {
      path: '/shift-report',
      name: 'ShiftReport',
      component: ShiftReport,
    }
  ]
})

export default router