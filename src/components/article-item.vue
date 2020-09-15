<template>
  <van-cell class="article-item">
    <div
      slot="title"
      class="article-title van-multi-ellipsis--l3"
    >{{article.title}}</div>
    <div slot="label" class="article-label">
      <div v-if="article.cover.type === 3" class="article-cover-wrap">
        <div v-for="(item,index) in article.cover.images" :key="index" class="article-cover-item">
          <van-image fit="cover" :src="item" />
        </div>
      </div>
      <div>
        <span class="item-text">{{article.aut_name}}</span>
        <span class="item-text">{{article.comm_count}}</span>
        <span class="item-text">{{article.pubdate | RelativeTime}}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .article-title {
    font-size: 32px;
  }
  .van-cell__value {
    flex: unset;
    width: 233px;
    height: 146px;
    padding-left: 24px;
  }
  span.item-text{
    margin-right: 26px;
    font-size: 20px;
    color: #b4b4b4;
  }
  .article-cover-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .article-cover-item {
      flex: 1;
      height: 147px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .van-image {
        width: 233px;
        height: 147px;
      }
    }
  }
}
</style>
