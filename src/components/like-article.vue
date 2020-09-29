<template>
    <van-icon
        :color="value=== 1 ?'orange':'#777'"
        :name="value === 1 ? 'good-job': 'good-job-o'"
        @click="doLikeArticle"
      />
</template>

<script>
import { setArticleLike, deleteArticleLike } from '@/api/article.js'
export default {
  name: 'LikeArticle',
  props: {
    authorId: {
      type: [Number, Object, String],
      require: true
    },
    value: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      // islike: this.value
    }
  },
  created () {

  },
  methods: {
    async doLikeArticle () {
      let status = -1
      try {
        if (this.value === -1) {
          // 取消关注
          await setArticleLike(this.authorId)
          status = 1
        } else {
          // 关注
          await deleteArticleLike(this.authorId)
        }
      } catch (err) {
        console.log(err)
      }
      // this.islike = !this.islike
      this.$emit('input', status)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
