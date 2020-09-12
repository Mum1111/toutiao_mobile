/**
 * 封装axios
 */

import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

export { request }
