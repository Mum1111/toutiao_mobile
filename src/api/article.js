
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

const getArticleById = id => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${id}`
  })
}

export { getUserChannel, getArticles, getArticleById }
