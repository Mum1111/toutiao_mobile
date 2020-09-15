
import { request } from '@/utils/request.js'

/**
 * 获取用户频道列表
 */
const getChannels = () => {
  return request({
    medthod: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/**
 * 获取用户全部频道列表
 */
const getAllChannels = () => {
  return request({
    medthod: 'GET',
    url: '/app/v1_0/channels'
  })
}
export { getChannels, getAllChannels }
