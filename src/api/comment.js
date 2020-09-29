import { request } from '@/utils/request.js'

/**
 * 对评论或评论回复点赞
 */
const getCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 */
const deleteCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

/**
 * 添加评论或评论回复
 */
const pushComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
export { getCommentLike, deleteCommentLike, pushComment }
