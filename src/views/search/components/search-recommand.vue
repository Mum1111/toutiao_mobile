<template>
  <div class="search-suggestion">
    <van-cell
      :title="item"
      icon="search"
      v-for="(item,index) in searchSuggList"
      :key="index"
      @click="$emit('search',item)"
    >
      <div slot="title" v-html="repText(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchRecomend',
  props: {
    searchTxt: {
      type: String,
      require
    }
  },
  data () {
    return {
      searchSuggList: []
    }
  },
  watch: {
    searchTxt: {
      // 进行防抖优化
      handler: debounce(function (val) {
        this.loadSearchSuggestion(val)
      }, 500)
      /* handler (val) {
        this.loadSearchSuggestion(val)
      },
      immediate: true */
    }
  },
  created () {},
  methods: {
    async loadSearchSuggestion (q) {
      try {
        const { data: res } = await getSearchSuggestion(q)
        console.log(res)
        this.searchSuggList = res.data.options
      } catch (err) {
        console.log('请求失败', err)
      }
    },
    repText (text) {
      // console.log(text)
      const replaceText = `<span style="color:red">${this.searchTxt}</span>`
      const reg = new RegExp(this.searchTxt, 'ig')
      // console.log(reg)
      // console.log(text.replace(reg, replaceText))
      return text.replace(reg, replaceText)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
