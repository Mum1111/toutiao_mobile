import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // user: null
    // user: JSON.parse(window.localStorage.getItem(TOKEN))
    user: getItem(TOKEN)
  },
  mutations: {
    setUser (state, user) {
      // 这样保存会在关闭页面时就会丢失token值 丢失用户体验 所以需要将token在本地存储中保存一份
      state.user = user
      // window.localStorage.setItem(TOKEN, JSON.stringify(user))
      setItem(TOKEN, user)
    }
  },
  actions: {
  },
  modules: {
  }
})
