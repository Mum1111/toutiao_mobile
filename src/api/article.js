
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

/**
 * 获取文章详情
 * @param {*} id
 */
const getArticleById = id => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${id}`
  })
}

/**
 * 获取文章点赞
 * @param {*} target
 */
const setArticleLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

/**
 * 取消对文章点赞
 * @param {*} target
 */
const deleteArticleLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}

/**
 * 收藏文章
 * @param {*} target
 */
const setArticleCollected = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消对文章点赞
 * @param {*} target
 */
const deleteArticleCollected = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

/**
 * 获取文章评论列表
 * @param {*} id
 */
const getArticleComment = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

export { getUserChannel, getArticles, getArticleById, setArticleLike, deleteArticleLike, setArticleCollected, deleteArticleCollected, getArticleComment }
