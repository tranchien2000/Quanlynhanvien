import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import StudentManager from '@/components/StudentManager'
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
      path: '/student-manager',
      name: 'StudentManager',
      component: StudentManager,
    }
  ]
})

export default router