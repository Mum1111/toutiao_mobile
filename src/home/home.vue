<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar id="page-nav-bar"  fixed >
      <van-button slot="title" type="info" icon="search" class="search-btn" round size="small" to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- tabs栏 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="item.name" v-for="item in userChannel" :key="item.id">
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="palceholder"></div>
      <div slot="nav-right" class="hanbuger-btn" @click="showPopup">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup v-model="show" position="bottom" :style="{ height: '95%' }" round>
      <channel-edit :userChannel="userChannel" :active="active" @checkChannel="checkChannel" @removeChannel="removeChannel" ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  props: [],
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      userChannel: [],
      show: false
    }
  },
  created () {
    // 加载用户频道列表
    this.loadUserChannel()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadUserChannel () {
      // 优化
      if (this.user) {
        // 判断用户登录 从后台获取用户频道
        // 获取频道列表
        const { data: res } = await getChannels()
        this.userChannel = res.data.channels
        // console.log(this.userChannel)
      } else {
        const localChannel = getItem('TOUTIAO_CHANNEL')
        // 用户没有登录 从本地存储获取频道列表
        if (localChannel.length !== 0) {
          this.userChannel = localChannel
        } else {
          try {
            const { data: res } = await getChannels()
            this.userChannel = res.data.channels
            console.log(this.userChannel)
          } catch (err) {
            console.log('请求失败', err)
          }
        }
        // console.log(this.userChannel)
      }
    },
    showPopup () {
      this.show = true
    },
    checkChannel (index) {
      this.active = index
      this.show = false
    },
    removeChannel (index) {
      if (index === -1) {
        index = 0
      }
      this.active = index
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  #page-nav-bar {
    /deep/.van-nav-bar__title {
      max-width: 100%;
      .search-btn {
        width: 555px;
        height: 70px;
        background-color: rgb(3, 146, 146);
        border: none;
        font-size: 32px;
        .van-icon {
          font-size: 44px;
          color: #fff;
        }
      }
    }
  }

  /deep/.channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 20;
      width: 100%;
    }
    .van-tabs__content {
      padding-top: 172px;
    }
    .van-tabs__nav {
      padding-bottom: 0;
      .van-tab {
        border-right: 1px solid #eee;
        font-size: 26px;
        color: #777777;
        min-width: 200px;
        height: 80px;
      }
      .van-tab--active {
        color: teal;
        font-size: 30px;
      }
      .van-tabs__line {
        background-color: teal;
        bottom: 0;
        width: 34px;
        height: 8px;
      }
      .hanbuger-btn {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.902;
        width: 67px;
        height: 82px;
        background-color: #fff;
        i.toutiao {
          font-size: 32px;
        }
        &:before {
          content: "";
          position: absolute;
          left: 0;
          width: 2px;
          height: 100%;
          background: url("~@/assets/gradient-gray-line.png");
          background-size: contain;
        }
      }
      .palceholder {
        width: 67px;
        height: 80px;
        flex-shrink: 0;
      }
    }
  }
}
</style>
