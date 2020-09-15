
import { request } from '@/utils/request.js'

/**
 * 获取用户频道列表
 */
const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

export { getUserChannel, getArticles }
