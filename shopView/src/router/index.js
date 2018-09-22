import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'index3',
      component: () => import('@/pages/index')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/index')
    },
    {
      path: '/index',
      name: 'index2',
      component: () => import('@/pages/index')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login')
    },
  ]
})
