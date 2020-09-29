<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap" >
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isloading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articles.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{articles.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articles.aut_photo"
          />
          <div slot="title" class="user-name">{{articles.aut_name}}</div>
          <div slot="label" class="publish-date">{{articles.pubdate|RelativeTime}}</div>

          <!-- 关注用户按钮 -->
          <follow-user :authorId="articles.aut_id" v-model="articles.is_followed"></follow-user>
          <!-- 关注用户按钮 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" ref="contentRef" v-html="articles.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <article-comment :list="commentList" :articleId="articles.art_id" @onload-success="commentTotal=$event.total_count"></article-comment>
        <!-- 文章评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArticleById" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isCommentShow=true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :info="commentTotal"
        color="#777"
      />
      <!-- 收藏文章 -->
      <like-article :authorId="articles.art_id" v-model="articles.attitude"></like-article>
      <!-- 收藏文章 -->
      <!-- 点赞文章 -->
      <collect-article :authorId="articles.art_id" v-model="articles.is_collected"></collect-article>
      <!-- <van-icon
        color="#777"
        name="good-job-o"
      /> -->
      <!-- 点赞文章 -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-popup v-model="isCommentShow" position="bottom">
      <post-comment :articleId="articles.art_id" @post-success="onPostSuccess"></post-comment>
    </van-popup>

    <van-popup v-model="isReplyShow" round :style="{ height: '92%' }" position="bottom">
      <comment-reply :comment="replyList" v-if="isReplyShow"></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'
import './github-markdown.css'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user.vue'
import LikeArticle from '@/components/like-article.vue'
import CollectArticle from '@/components/collect-article.vue'
import ArticleComment from './components/article-comment.vue'
import PostComment from './components/comment-post/comment-post.vue'
import CommentReply from './components/comment-reply/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    LikeArticle,
    CollectArticle,
    ArticleComment,
    PostComment,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      articles: {},
      isloading: true,
      isNotFound: false,
      commentTotal: 0,
      isCommentShow: false,
      commentList: [],
      isReplyShow: false,
      replyList: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleById()
    this.$bus.$on('reply-comment', (obj) => {
      this.replyList = obj
      this.isReplyShow = true
    })
  },
  mounted () {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async loadArticleById () {
      try {
        const { data: res } = await getArticleById(this.articleId)
        console.log(res)
        this.articles = res.data
        setTimeout(() => {
          this.previewImg()
        }, 0)
      } catch (err) {
        if (err.resonse.status === 404) {
          this.isNotFound = true
          console.log('请求失败', err)
        }
      }
      this.isloading = false
    },
    previewImg () {
      const contentEl = this.$refs.contentRef
      const allImg = contentEl.querySelectorAll('img')
      console.log(allImg)
      const images = []
      allImg.forEach((item, index) => {
        images.push(item.currentSrc)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (res) {
      this.commentList.unshift(res.data.data.new_obj)
      this.isCommentShow = false
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
