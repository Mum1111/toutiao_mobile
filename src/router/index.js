import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  /**
   * 登录页的路由
   */
  { path: '/login', name: 'LoginPage', component: Login },
  {
    path: '/',
    name: 'LayoutPage',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      {
        path: '/my',
        name: 'MyPage',
        component: () => import('@/my/my.vue')
      },
      {
        path: '/home',
        name: 'HomePage',
        component: () => import('@/home/home.vue')
      },
      {
        path: '/qa',
        name: 'QaPage',
        component: () => import('@/qa/qa.vue')
      },
      {
        path: '/vedio',
        name: 'VedioPage',
        component: () => import('@/vedio/vedio.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
