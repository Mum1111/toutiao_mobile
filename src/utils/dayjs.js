import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言
import relativeTime from 'dayjs/plugin/relativeTime' // ES 2015
dayjs.extend(relativeTime) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

Vue.filter('RelativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
