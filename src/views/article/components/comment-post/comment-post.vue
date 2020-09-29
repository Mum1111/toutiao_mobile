<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="info"
      size="small"
      @click="onPushComment"
    >发布</van-button>
  </div>
</template>

<script>
import { pushComment } from '@/api/comment.js'
export default {
  name: 'PostComment',
  components: {},
  props: {
    articleId: {
      type: [String, Object, Number],
      require: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPushComment () {
      if (!this.message) return this.$toast('请输入内容')
      try {
        const res = await pushComment({
          target: this.articleId.toString(),
          content: this.message,
          art_id: null
        })
        this.$toast('成功')
        this.$emit('post-success', res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: center;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
