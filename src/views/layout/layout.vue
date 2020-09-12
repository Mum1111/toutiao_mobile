<template>
    <div>
        <router-view></router-view>

        <!-- 引入tabbar -->
        <van-tabbar  route>
            <van-tabbar-item replace to="/home">
                <i slot="icon" class="toutiao toutiao-shouye"></i>
                <span class="text">首页</span>
            </van-tabbar-item>
            <van-tabbar-item replace to="/qa">
                <i slot="icon" class="toutiao toutiao-wenda"></i>
                <span class="text">问答</span>
            </van-tabbar-item>
            <van-tabbar-item replace to="/vedio">
                <i slot="icon" class="toutiao toutiao-shipin"></i>
                <span class="text">视频</span>
            </van-tabbar-item>
            <van-tabbar-item replace to="/my">
                <i slot="icon" class="toutiao toutiao-wode"></i>
                <span class="text">我的</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
    .toutiao{
        font-size: 40px;
    }
</style>
