import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Search from '@/views/search/search.vue'

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
  },
  { path: '/search', name: 'SearchPage', component: Search },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('@/views/profile/user-profile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
