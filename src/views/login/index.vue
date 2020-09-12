<template>
    <div class="login-container">
        <van-nav-bar
        title="登录"
        @click-left="onClickLeft"
        >
        <template #left>
            <van-icon name="arrow-left" class="arrow-left"/>
        </template>
        </van-nav-bar>
        <!-- 表单区域 -->
        <van-form @submit="onLogin" class="loginform">
        <van-cell-group class="login-group">
            <van-field
                v-model="loginForm.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="loginFormRule.mobile"
                class="login-filed"
                clearable
                maxlength="11"
            >
            <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
                type="number"
                v-model="loginForm.code"
                name="code"
                placeholder="请输入验证码"
                :rules="loginFormRule.code"
                class="login-filed"
                maxlength="6"
            >
            <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
            <template #button>
                <van-button v-if="isShowBtn" size="small" type="default" round @click="sendSms">发送验证码</van-button>
                <van-count-down :time="time" v-else format="ss 秒后再试" @finish="isShowBtn = true"/>
            </template>
            </van-field>
        </van-cell-group>
        <div  class="login-btn">
            <van-button block type="info" native-type="submit">
            提交
            </van-button>
        </div>
        </van-form>
    </div>
</template>

<script>
import { login, verCode } from '@/api/index.js'
export default {
  name: 'LoginPage',
  props: [],
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      time: 60 * 1000,
      isShowBtn: true,
      loginFormRule: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入6位验证码' }
        ]
      }
    }
  },
  created () {

  },
  methods: {
    // 点击左侧的按钮 切换页面
    onClickLeft () {
      this.$router.back()
    },
    async onLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const user = this.loginForm
      try {
        const { data: res } = await login(user)
        console.log(res.data)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data)
        // 如果成功进行下一步操作
        this.$router.push('/my')
      } catch (err) {
        if (err || err.response.status !== 201) {
          return this.$toast.fail('登录失败,手机号或验证码输入错误')
        }
      }
    },
    async sendSms () {
      // 验证手机号是否正确
      if (!(/^1[3456789]\d{9}$/.test(this.loginForm.mobile))) {
        this.$toast.fail('请填写正确的手机号')
        return false
      }
      // 切换显示倒计时
      this.isShowBtn = false
      // 发送请求
      try {
        await verCode(this.loginForm.mobile)
        this.$toast.success('验证码发送成功')
      } catch (err) {
        // console.log('err', err)
        if (err || err.response.status !== 200) {
          return this.$toast.fail('验证码发送失败，请稍后再试')
        }
      }
    }

  }
}
</script>

<style lang="less" scoped>
.van-nav-bar{
    background-color: teal;
    .arrow-left{
        color: #fff;
        font-size: 40px;
    }
}

.loginform{
    .login-group{
        height: 190px;
        margin-top: 20px;
        .login-filed{
        padding: 0 25px;
        background-color: none;
        height: 90px;
        line-height: 90px;
        font-size: 26px;
        color: #c0c0c0;
        .toutiao{
            font-size: 40px;
            margin-right: 20px;
        }
    }
    }

    .login-btn{
        // border-radius: 24px;
        color: #fff;
        font-size: 30px;
        margin: 60px 32px;
        .van-button{
        border-radius: 14px;
        background-color: teal;
    }
    }

}
</style>
