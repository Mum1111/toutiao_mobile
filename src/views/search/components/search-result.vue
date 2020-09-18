<template>
  <!-- :error.sync="error" -->
  <!-- error-text="请求失败，点击重新加载" -->
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  props: {
    searchTxt: {
      type: String,
      require
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      error: false
    }
  },
  created () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data: res } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchTxt
      })
      // console.log(res.data.results)
      const { results } = res.data
      this.list.push(...results)
      // console.log(this.list)
      // console.log(results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      /* if (this.list.length >= 40) {
        this.finished = true
      } */
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
      /* try {
        const { data: res } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchTxt
        })
        // console.log(res.data.results)
        const { results } = res.data
        this.list.push(...results)
        // console.log(this.list)
        console.log(results)
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
         if (this.list.length >= 40) {
        this.finished = true
      }
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      }catch (err) {
        this.error = true
        this.loading = false
      }  */
    }
  }
}
</script>

<style lang="less" scoped>
</style>
