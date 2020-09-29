<template>
    <div class="avatar-photo">
       <img :src="img" id="image" class="img-avatar">
       <div class="toolbar">
           <div class="cencel" @click="$emit('close')">取消</div>
           <div class="confirm" @click="onConfirm">确定</div>
       </div>
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/index.js'
export default {
  name: 'UpdateAvatar',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  created () {

  },
  methods: {
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateAvatar(blob)
      })
    },
    async updateAvatar (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserAvatar(formData)
        // 关闭弹层，更新视图
        this.$emit('close')
        this.$emit('update-avatar', data.data.photo)
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  },
  mounted () {
    const image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style lang="less" scoped>
.avatar-photo{
    background-color: #000;
    height: 100%;
    .toolbar{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        .cencel,.confirm{
            font-size: 30px;
            color: #fff;
        }
    }
}
.img-avatar{
    display: block;
    max-width: 100%;
}
</style>
