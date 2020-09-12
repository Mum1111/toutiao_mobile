<template>
    <div class="my-container">
        <!-- 登录页面 -->
        <div class="header userinfo" v-if="user">
          <div class="base">
            <div class="avatar-name">
              <van-image
                round
                class="avatar"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
              <span class="username">木米</span>
            </div>
            <van-button round type="default" class="edit-info">编辑资料</van-button>
          </div>
          <div class="style-datas">
            <div class="user-data">
              <span class="count">{{userInfo.art_count}}</span>
              <span class="text">头条</span>
            </div>
            <div class="user-data">
              <span class="count">{{userInfo.follow_count}}</span>
              <span class="text">关注</span>
            </div>
            <div class="user-data">
              <span class="count">{{userInfo.fans_count}}</span>
              <span class="text">粉丝</span>
            </div>
            <div class="user-data">
              <span class="count">{{userInfo.like_count}}</span>
              <span class="text">点赞</span>
            </div>
          </div>
        </div>
      <!-- 未登录页面 -->
        <div class="header" v-else>
          <div class="header-logo" @click="goToLogin">
            <img class="mobile" src="../assets/mobile.png" alt="">
            <span class="text">登录 / 注册</span>
          </div>
        </div>
        <van-grid :column-num="2" class="grid" clickable>
          <van-grid-item>
            <i slot="icon" class="toutiao toutiao-shoucang"></i>
            <span slot="text" class="grid-text">收 藏</span>
          </van-grid-item>
          <van-grid-item>
             <i slot="icon" class="toutiao toutiao-lishi"></i>
            <span slot="text" class="grid-text">历 史</span>
          </van-grid-item>
        </van-grid>
        <div class="cell">
          <van-cell title="消息通知" is-link  />
          <van-cell title="小智同学" is-link />
          <van-button v-if="user" type="default" block class="logoutBtn" @click="logoutBtn">退出登录</van-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUser } from '@/api/index.js'
export default {
  name: 'MyPage',
  props: [],
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.getUserInfo()
    }
  },
  methods: {
    // 点击前往登录页
    goToLogin () {
      this.$router.push('/login')
    },
    // 退出登录按钮
    logoutBtn () {
      // 增加用户体验 加入确认框
      this.$dialog.confirm({
        title: '退出确认',
        message: '在玩一会吧～'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('hello world')
        })
    },
    async getUserInfo () {
      try {
        const { data: res } = await getUser()
        console.log(res)
        this.userInfo = res.data
      } catch (err) {
        if (err || err.response.status !== 200) {
          return this.$toast.fail('加载失败，稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  box-sizing: border-box;
  width: 100%;
  height: 400px;
  background: url('~@/assets/banner.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .header-logo{
    width:150px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    .mobile{
      width: 135px;
      height: 135px;
    }
    .text{
      color: #fff;
      font-size: 28px;
      margin-top: 20px;
    }
  }
}
.grid{
  height: 140px;
  .toutiao{
    font-size: 45px;

  }
  .toutiao-shoucang{
    color: #ec595a;
  }
  .toutiao-lishi{
    color:#ff9d1d;
  }
  .grid-text{
    font-size: 28px;
    margin-top: 15px;
  }
}
.cell{
  margin-top: 90px;
  .logoutBtn{
    margin-top: 20px;
    color: tomato;
  }
}

//用户已登录界面
.userinfo{
  width: 100%;
  display: flex;
  flex-direction: column;
  .base{
    box-sizing: border-box;
    width: 100%;
    height: 270px;
    padding: 113px 46px 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar-name{
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar{
      width: 130px;
      height: 130px;
      border: 4px solid #fff;
      margin-right: 20px;
    }
    .username{
      font-size: 30px;
      color: #fff;
    }
    }
    .edit-info{
      width: 120px;
      height: 30px;
      border-radius: 15px;
      padding: 0;
      font-size: 20px;
    }
  }
  .style-datas{
    width: 100%;
    height: 130px;
    display: flex;
    .user-data{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .count{
        font-size: 30px;
        color: #fff;
      }
      .text{
        margin-top: 20px;
        font-size: 30px;
        color: #fff;
      }
    }
  }
}
</style>
