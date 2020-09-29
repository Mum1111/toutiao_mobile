<template>
  <div>
    <!-- 顶部区域 -->
    <van-nav-bar title="修改资料" left-arrow @click-left="onClickLeft" />
    <!-- 修改头像 -->
    <!-- 定义一个隐藏的input框 -->
    <input type="file" hidden ref="file" @change="inputChange" />
    <van-cell title="修改头像" is-link @click="$refs.file.click()">
      <van-image round cover class="avatar" :src="user.photo" />
    </van-cell>
    <!-- 修改头像 -->
    <!-- 修改用户名 -->
    <van-cell
      title="修改用户名"
      @click="OnShowUsername"
      :value="user.name"
      is-link
    />
    <!-- 修改用户名 -->
    <!-- 修改性别 -->
    <van-cell
      title="修改性别"
      :value="user.gender ? '女' : '男'"
      @click="isShowGender = true"
      is-link
    />
    <!-- 修改性别 -->
    <!-- 修改出生日期 -->
    <van-cell
      title="修改出生日期"
      :value="user.birthday"
      is-link
      @click="isShowBirthday = true"
    />
    <!-- 修改出生日期 -->

    <!-- 修改用户名的弹出层 -->
    <van-popup
      v-model="isShowUsername"
      position="bottom"
      :style="{ height: '92%' }"
      v-if="isShowUsername"
    >
      <update-user
        v-if="isShowUsername"
        v-model="user.name"
        @close="onCloseUsername"
      ></update-user>
    </van-popup>
    <!-- 修改用户名的弹出层 -->

    <!-- 修改性别的弹出层 -->
    <van-popup v-model="isShowGender" position="bottom" v-if="isShowGender">
      <update-gender
        v-if="isShowGender"
        v-model="user.gender"
        @close="onCloseGender"
      ></update-gender>
    </van-popup>
    <!-- 修改性别的弹出层 -->
    <!-- 修改出生日期弹出层 -->
    <van-popup v-model="isShowBirthday" position="bottom" v-if="isShowBirthday">
      <update-birthday
        v-if="isShowBirthday"
        v-model="user.birthday"
        @close="onCloseBirthday"
      ></update-birthday>
    </van-popup>
    <!-- 修改出生日期弹出层 -->
    <van-popup
      v-model="isShowUpdateAvatar"
      style="height: 100%"
      position="bottom"
    >
      <update-avatar
        :img="img"
        @close="onCloseAvatar"
        v-if="isShowUpdateAvatar"
        @update-avatar="user.photo = $event"
      ></update-avatar>
    </van-popup>
  </div>
</template>

<script>
import UpdateUser from './components/update-user.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdateAvatar from './components/update-avatar.vue'
import { getUserProfile } from '@/api/index.js'
export default {
  name: 'UserProfile',
  components: {
    UpdateUser,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar
  },
  props: [],
  data () {
    return {
      isShowUsername: false,
      isShowGender: false,
      isShowBirthday: false,
      isShowUpdateAvatar: false,
      user: {},
      img: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data: res } = await getUserProfile()
      console.log(res)
      this.user = res.data
    },
    onClickLeft () {
      this.$router.back()
    },
    OnShowUsername () {
      this.isShowUsername = true
    },
    onCloseUsername () {
      this.isShowUsername = false
    },
    onCloseGender () {
      this.isShowGender = false
    },
    onCloseBirthday () {
      this.isShowBirthday = false
    },
    inputChange () {
      const files = this.$refs.file.files[0]
      // console.log(files)
      this.img = window.URL.createObjectURL(files)
      this.isShowUpdateAvatar = true
      this.$refs.file.values = ''
    },
    onCloseAvatar () {
      this.isShowUpdateAvatar = false
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 60px;
  height: 60px;
}
</style>
