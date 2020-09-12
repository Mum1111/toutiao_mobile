import { request } from '@/utils/request.js'

/**
 * 登录的请求
 * @param {*} data
 */
const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送验证码的请求
 */
const verCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己的信息
 */
const getUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

export { login, verCode, getUser }
