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
import { getAllChannels } from '@/api/channel.js'
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
        console.log(res)
        this.allChannels = res.data.channels
      } catch (err) {
        console.log('请求失败', err)
      }
    },
    onAddChannel (value) {
      this.userChannel.push(value)
    },
    isEditShow () {
      this.isEdit = !this.isEdit
    },
    onMyChannelClick (value, index) {
      if (this.isEdit) {
        // 执行删除操作
        if (this.active <= index) {
          this.$emit('removeChannel', this.active - 1)
        }
        this.userChannel.splice(index, 1)
      } else {
        // 执行切换操作
        this.$emit('checkChannel', index)
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
    }
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
