/**
 * 封装axios
 */

import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 设置一个请求拦截器 对需要request header 的请求绑定请求头
request.interceptors.request.use(config => {
// Do something before request is sent
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})

export { request }
