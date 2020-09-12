import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  /**
   * 登录页的路由
   */
  { path: '/login', name: 'LoginPage', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
