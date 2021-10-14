<template>
  <div>
		<div class="ui top attached segment m-padded-lr-big">
			<h2 class="m-text-500" style="text-align: center">关于我</h2>
			<div class="typo content m-margin-top-large" v-html="about.content"></div>
		</div>
		<!--评论-->
		<div class="ui bottom teal attached segment threaded comments">
			<CommentList :blogId="null"/>
		</div>
	</div>

</template>

<script>
import CommentList from "@/components/comment/CommentList";
import { getAbout } from '@/network/about'

export default {
  data(){
    return {
      about:{
        content: ""
      }
    }
  },
  components: {
    CommentList
  },
  methods:{
    async getAbout(){
      const res = await getAbout()
      this.about.content = res.data.content
    },
  },
  
  created(){
    this.getAbout()
  }
}
</script>

<style scoped>
	.content ul li {
		letter-spacing: 1px !important;
	}
</style>