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

/**
 * 关注用户
 * @param {*} target
 */
const addUserFollow = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 */
const deleteUserFollow = targetId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${targetId}`
  })
}

/**
 * 获取用户自己的信息
 */
const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

/**
 * 编辑用户个人资料
 */
const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

/**
 * 更新头像
 */
const updateUserAvatar = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}

export { login, verCode, getUser, addUserFollow, deleteUserFollow, editUserProfile, getUserProfile, updateUserAvatar }
