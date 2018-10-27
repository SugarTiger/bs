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
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/pages/user')
    },
    {
      path: '/pro_details',
      name: 'pro_details',
      component: () => import('@/pages/pro_details')
    },
    {
      path: '/shop_list',
      name: 'shop_list',
      component: () => import('@/pages/shop_list')
    },
    {
      path: '/shop_cart',
      name: 'shop_cart',
      component: () => import('@/pages/shop_cart')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/pages/order')
    },
    {
      path: '/confirm_order',
      name: 'confirm_order',
      component: () => import('@/pages/confirm_order')
    },
  ]
})
