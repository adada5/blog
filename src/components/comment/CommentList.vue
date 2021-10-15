<template>
	<div>
		<Comment/>
	</div>
</template>

<script>
import Comment from "./Comment";
import { SET_PARENT_COMMENT_ID,SET_BLOG_ID } from '@/store/mutations-types';

export default {
  components: {Comment},
  props: {
    // 关于我页面blogId为null，Object类型
    blogId: {
      type: String | Object,
      required: true
    }
  },
  
	computed: {
	},
  
  created() {
    this.init()
    console.log(this.blogId)
  },
  watch: {
    //在博客文章路由到其它含有评论的页面时，要重新获取评论
    '$route.path'() {
      this.init()
    }
  },
  methods:{
    init() {
      //重置评论表单位置
      this.$store.commit(SET_PARENT_COMMENT_ID, '-1')
      this.$store.commit(SET_BLOG_ID, this.blogId)
      this.$store.dispatch('getCommentList')
    }
  }
}
</script>

<style>

</style>

