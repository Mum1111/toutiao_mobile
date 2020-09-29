<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <comment-item :item="item" v-for="(item,index) in list" :key="index"></comment-item>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getArticleComment } from '@/api/article.js'
import CommentItem from './comment-item/comment-item.vue'
export default {
  name: 'ArticleComment',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      require: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null
      // type: 'a' // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data: res } = await getArticleComment({
          type: this.type,
          source: this.articleId.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id
          limit: 10 // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        console.log(res)
        const { results } = res.data
        this.list.push(...results)
        this.$emit('onload-success', res.data)
        // console.log(this.list)
      } catch (err) {
        console.log(err)
      }
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成

      if (this.list) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
