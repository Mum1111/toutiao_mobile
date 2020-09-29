<template>
    <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            v-if="!value"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            :loading="btnLoading"
          >关注</van-button>
          <van-button
            class="follow-btn"
            round
            size="small"
            v-else
            @click="onFollow"
            :loading="btnLoading"
          >已关注</van-button>
</template>

<script>
import { addUserFollow, deleteUserFollow } from '@/api/index.js'
export default {
  name: 'FollowUser',
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
      btnLoading: false
    }
  },
  created () {

  },
  methods: {
    async onFollow () {
      try {
        this.btnLoading = true
        if (!this.value) {
          // 没关注 点击关注
          await addUserFollow(this.authorId)
        } else {
          // 关注了 取消关注
          await deleteUserFollow(this.authorId)
        }
      } catch (error) {
        console.log(error)
      }
      this.btnLoading = false
      // this.isFollow = !this.isFollow
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
