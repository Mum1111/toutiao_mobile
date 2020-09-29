<template>
    <div>
    <van-datetime-picker
        v-model="currentDate"
         type="date"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cencel="onCencel"
        />
    </div>
</template>

<script>
import { editUserProfile } from '@/api/index.js'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 0),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  created () {

  },
  methods: {
    async onConfirm () {
      try {
        const userBirthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        console.log(userBirthday)
        await editUserProfile({
          birthday: userBirthday
        })
        this.$toast('修改出生日期成功')
        this.$emit('input', userBirthday)
        this.$emit('close')
      } catch (err) {
        console.log(err)
        this.$toast('修改出生日期失败')
      }
    },
    onCencel () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
