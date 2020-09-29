<template>
    <div>
        <van-picker
        title="修改性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
        :default-index="value"
        />
    </div>
</template>

<script>
import { editUserProfile } from '@/api/index.js'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  created () {

  },
  methods: {
    async onConfirm () {
      // console.log(this.gender)
      try {
        const localGender = this.gender
        await editUserProfile({
          gender: localGender
        })
        // 更新视图
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast('修改成功')
      } catch (err) {
        this.$toast('修改失败')
        console.log(err)
      }
      // this.$emit('input', localGender)
    },
    onChange (picker, value, index) {
      console.log(index)
      this.gender = index
    },
    onCancel () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
