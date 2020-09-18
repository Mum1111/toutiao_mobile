<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="!isDeleteShow">
        <span @click="$emit('delete-all-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow=true">完成</span>
      </template>
      <van-icon name="delete" v-else @click="isDeleteShow = false" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item,index) in searchHistoryList"
      :key="index"
      @click="onHistoryClick(item,index)"
    >
      <van-icon name="close" v-show="!isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistoryList: {
      type: Array,
      require
    }
  },
  data () {
    return {
      isDeleteShow: true
    }
  },
  created () {},
  methods: {
    onHistoryClick (item, index) {
      if (this.isDeleteShow) {
        // 执行跳转操作
        this.$emit('toSearch', item)
      } else {
        // 执行删除操作
        this.$emit('deleteHistory', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
