<template>
  <div class="channel-edit-container">
    <van-cell title="我的频道" icon="shop-o">
      <van-button round plain size="mini" color="teal" @click="isEditShow">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(value,index) in userChannel" :key="value.id" icon="close" @click="onMyChannelClick(value,index)">
        <span class="text" :class="{active: active === index}" slot="text">{{ value.name }}</span>
        <van-icon v-show="isEdit&&index!==0" slot="icon" name="close" />
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" icon="shop-collect-o"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(value,index) in recommendChannels"
        :key="index"
        icon="plus"
        class="recommand-grid-item-content"
        @click="onAddChannel(value)"
      >
        <span class="text" slot="text">{{ value.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannels } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    userChannel: {
      type: Array,
      require
    },
    active: {
      type: Number,
      require
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  created () {
    this.loadAllChannel()
  },
  methods: {
    async loadAllChannel () {
      try {
        const { data: res } = await getAllChannels()
        // console.log(res)
        this.allChannels = res.data.channels
      } catch (err) {
        console.log('请求失败', err)
      }
    },
    // 添加频道操作
    async onAddChannel (value) {
      // console.log(value)
      // 把推荐频道中的数据推送到我的频道中
      this.userChannel.push(value)
      if (this.user) {
        // 用户已经登录 把添加的频道数据上传到服务器
        console.log('jinru')
        try {
          // console.log(111)
          await addUserChannel({
            id: value.id,
            seq: this.userChannel.length
          })
          // console.log('添加数据', res)
        } catch (err) {
          console.log('添加失败', err)
        }
      } else {
        // 用户没有登录 把添加的频道列表传到本地存储
        setItem('TOUTIAO_CHANNEL', this.userChannel)
      }
    },
    isEditShow () {
      // 显示或隐藏 右上角的叉号
      this.isEdit = !this.isEdit
    },
    // 点击我的频道触发的事件(删除或者跳转)
    onMyChannelClick (value, index) {
      if (this.isEdit) {
        // 执行删除操作
        if (this.active <= index) {
          this.$emit('removeChannel', this.active - 1)
        }
        this.userChannel.splice(index, 1)
        // 删除频道持久化操作
        this.deleteChannel(value)
      } else {
        // 执行切换操作 跳转到home页 选中当前选中的按钮
        this.$emit('checkChannel', index)
      }
    },
    // 删除频道
    async deleteChannel (value) {
      if (this.user) {
        try {
        // console.log(111)
          const { data } = await deleteUserChannels(value.id)
          console.log(data)
        } catch (err) {
          console.log('删除失败', err)
        }
      } else {
        setItem('TOUTIAO_CHANNEL', this.userChannel)
      }
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter((item) => {
        return !this.userChannel.find((it) => {
          return item.id === it.id
        })
      })
    },
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.channel-edit-container {
  .van-cell {
    padding-top: 100px;
    &::after {
      border: 0;
    }
    .van-cell__title {
      font-size: 34px;
    }
    .van-cell__left-icon {
      font-size: 40px;
      color: teal;
    }
  }
  /deep/.van-grid {
    .van-grid-item__content {
      width: 160px;
      height: 85px;
      background-color: #f4f5f6;
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .text {
        margin-top: 0;
        font-size: 28px;
        white-space: nowrap;
        color: #333;
      }
      .active {
        color: teal;
      }
    }
  }
  /deep/.recommand-grid-item-content .van-grid-item__content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .van-grid-item__icon {
      font-size: 30px;
    }
    .van-grid-item__text {
      margin-top: 0;
    }
  }

  /deep/.van-icon-close {
    color: #000;
    font-size: 36px;
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 3;
  }
}
</style>
