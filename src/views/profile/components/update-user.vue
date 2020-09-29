<template>
    <div>
        <!-- 导航栏 -->
    <van-nav-bar title="编辑昵称" left-text="取消" right-text="确定" @click-left="$emit('close')" @click-right="onfirm" />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div style="padding: 10px;">
    <van-field
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新昵称"
      show-word-limit
    />
    </div>
    </div>
</template>

<script>
import { editUserProfile } from '@/api/index.js'
export default {
  name: 'UpdateUser',
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  created () {

  },
  methods: {
    async onfirm () {
      try {
        await editUserProfile({
          name: this.localName
        })
        this.$toast('修改成功')
        this.$emit('close')
        this.$emit('input', this.localName)
      } catch (err) {
        console.log(err)
        this.$toast('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
