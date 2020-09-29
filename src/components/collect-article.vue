<template>
    <van-icon
        :color="value?'orange':'#777'"
        :name="value?'star':'star-o'"
        @click="onCollect"
      />
</template>

<script>
import { setArticleCollected, deleteArticleCollected } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  props: {
    authorId: {
      type: [Number, Object, String],
      require: true
    },
    value: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    async onCollect () {
      try {
        if (!this.value) {
          // 收藏
          await setArticleCollected(this.authorId)
        } else {
          // 取消收藏
          await deleteArticleCollected(this.authorId)
        }
      } catch (err) {
        console.log(err)
      }
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
