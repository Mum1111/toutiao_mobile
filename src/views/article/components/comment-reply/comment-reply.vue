<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count+'条回复'" />
    <!-- /导航栏 -->
    <div class="scroll-wrap">
    <!-- 当前评论项 -->
    <comment-item :item="comment"></comment-item>
    <!-- /当前评论项 -->
    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <article-comment :articleId="comment.com_id" type="c"></article-comment>
    <!-- /评论的回复列表 -->
    <!-- 发布评论 -->
      <van-popup v-model="isPostShow" position="bottom">
        <post-comment class="comment-post" :articleId="comment.com_id" @post-success="onPostSuccess" />
      </van-popup>
      <!-- /评论的回复列表 -->
      <!-- /发布评论 -->
    </div>
    <!-- 底部 -->
    <div class="reply-bottom">
      <van-button class="write-btn" size="small" round @click="isPostShow = true">写评论</van-button>
    </div>
    <!-- /底部 -->
  </div>
</template>

<script>
import CommentItem from '../comment-item/comment-item.vue'
import ArticleComment from '../article-comment'
import PostComment from '../comment-post/comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    ArticleComment,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentsList: []
    }
  },
  created () {},
  methods: {
    onPostSuccess (data) {
      this.comment.reply_count++
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 100px;
  overflow-y: auto;
}
.comment-post{
    margin-bottom: 80px;
}
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
