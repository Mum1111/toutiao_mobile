<template>
  <div class="artcile-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
       <!--  <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
        <article-item v-for="(item,index) in list" :key="index" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item.vue'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      require
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      refreshSuccessText: ''
    }
  },
  created () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      //   请求数据、
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // console.log(res)
        const { results } = res.data
        this.list.push(...results)
        // 数据获取成功后 结束loading操作
        this.loading = false
        // 判断数据是否加载完成
        if (results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
        // console.log('请求接口失败', err)
      }
    },
    async onRefresh () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = res.data
        this.list.unshift(...results)
        // 数据获取成功后 结束loading操作
        this.isLoading = false
        // 刷新成功后的提示文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isRefreshLoading = false // 关闭下拉刷新的 loading 状态
        console.log('请求失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .artcile-list {
        height: 79vh;
        overflow-y: auto;
    }
</style>
