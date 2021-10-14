<template>
  <div>
    <div class="ui padded attached segment m-padded-tb-large m-margin-bottom-big m-box">
      <div class="ui middle aligned mobile reversed stackable">
        <div class="ui grid m-margin-lr">
          <!--标题-->
					<div class="row m-padded-tb-small">
						<h2 class="ui header m-center m-scaleup">
							<a href="javascript:;" class="m-black">{{ blog.title }}</a>
						</h2>
					</div>
          <!--文章简要信息-->
					<div class="row m-padded-tb-small">
						<div class="ui horizontal link list m-center">
							<div class="item m-datetime">
								<i class="small calendar icon"></i><span>{{ blog.addTime | dateFormat('YYYY-MM-DD')}}</span>
							</div>
							<div class="item m-views">
								<i class="small eye icon"></i><span>{{ blog.view }}</span>
							</div>
							<div class="item m-common-black">
								<i class="small pencil alternate icon"></i><span>字数≈{{ blog.words }}字</span>
							</div>
							<div class="item m-common-black">
								<i class="small clock icon"></i><span>阅读时长≈{{ blog.readTime }}分</span>
							</div>
						</div>
					</div>
          <!--分类-->
					<router-link :to="`/category/${blog.category}`" class="ui orange large ribbon label">
						<i class="small folder open icon"></i><span class="m-text-500">{{ blog.category }}</span>
					</router-link>
          <!--文章Markdown描述-->
					<div class="typo m-padded-tb-small line-numbers match-braces rainbow-braces" v-html="blog.description"></div>
          <!--阅读全文按钮-->
					<div class="row m-padded-tb-small m-margin-top">
						<a href="javascript:;" @click.prevent="toBlog(blog._id)" class="color-btn">阅读全文</a>
					</div>
          <!--横线-->
					<div class="ui section divider m-margin-lr-no"></div>
          <!--标签-->
					<div class="row m-padded-tb-no">
						<div class="column m-padding-left-no">
							<router-link :to="`/tag/${tag}`" class="ui tag label m-text-500 m-margin-small teal" v-for="(tag,index) in tags" :key="index">{{ tag }}</router-link>
						</div>
					</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  props:{
    blog: {
      type: Object,
      required: true
    },   
  },
  methods:{
    toBlog(id){
      this.$router.push(`/blog/${id}`)  
    }
  },
  created(){
    // this.tags = this.blog.tag.split(',')
  },
  watch:{
   
  },
  computed:{
    tags(){
      return this.blog.tag.split(',')
    }
  },
}
</script>

<style scoped>
  
  
</style>