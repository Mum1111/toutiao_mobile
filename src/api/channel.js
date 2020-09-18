
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

/**
 * 添加频道
 * @param {*} channel
 */
/* const addUserChannelsaaa = channel => {
  // console.log(channel)
  return request({
    url: '/app/v1_0/user/channels',
    // sb cuowu wocao!!!!!!
    medthod: 'PATCH',
    data: {
      channels: [channel]
    }
  })
} */

const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户频道 传入参数频道id
 * @param {*} channelId
 */
const deleteUserChannels = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
export { getChannels, getAllChannels, addUserChannel, deleteUserChannels }
