<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/" class="search">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isSearchShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isSearchShow" :searchTxt="searchText"></search-result>
    <!-- 搜索推荐 -->
    <search-recomend v-else-if="searchText" :searchTxt="searchText" @search="onSearch"></search-recomend>
    <!-- 搜索历史 -->
    <search-history
      v-else
      :searchHistoryList="searchHistoryList"
      @deleteHistory="deleteHistory"
      @toSearch="onSearch"
      @delete-all-history="deleteAllHistory"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchRecomend from './components/search-recommand.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'searchPage',
  components: {
    SearchHistory,
    SearchResult,
    SearchRecomend
  },
  props: [],
  data () {
    return {
      searchText: '',
      isSearchShow: false,
      searchHistoryList: getItem('SEARCHHISTORY') || []
    }
  },
  created () {},
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.searchHistoryList.indexOf(val)
      // 先判断是否有这个数据 如果有先删除原来的，在把这个数据添加到最新
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1)
      }
      this.searchHistoryList.unshift(val)
      this.isSearchShow = true
      // this.$toast(val)
    },
    deleteHistory (index) {
      this.searchHistoryList.splice(index, 1)
    },
    deleteAllHistory () {
      this.searchHistoryList = []
    }
  },
  watch: {
    searchHistoryList (val) {
      setItem('SEARCHHISTORY', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 106px;
  .van-search {
    background-color: teal;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
