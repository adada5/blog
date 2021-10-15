<template>
  <div>
    <div class="ui padded attached segment m-padded-tb-large">
			<div class="ui middle aligned mobile reversed stackable">
				<div class="ui grid m-margin-lr">
					<!--标题-->
					<div class="row m-padded-tb-small">
						<h2 class="ui header m-center">{{ blog.title }}</h2>
					</div>
					<!--文章简要信息-->
					<div class="row m-padded-tb-small">
						<div class="ui horizontal link list m-center">
							<div class="item m-datetime">
								<i class="small calendar icon"></i><span>{{ blog.addTime | dateFormat('YYYY-MM-DD') }}</span>
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
					<router-link :to="`/category/${blog.category}`" class="ui orange large ribbon label" v-if="blog.category">
						<i class="small folder open icon"></i><span class="m-text-500">{{ blog.category }}</span>
					</router-link>
					<!--文章Markdown正文-->
					<div class="typo js-toc-content m-padded-tb-small line-numbers match-braces rainbow-braces" v-html="blog.content"></div>
					
					<!--横线-->
					<el-divider></el-divider>
					<!--标签-->
					<div class="row m-padded-tb-no">
						<div class="column m-padding-left-no">
							<router-link :to="`/tag/${tag}`" class="ui tag label m-text-500 m-margin-small teal" v-for="(tag,index) in tags" :key="index">{{ tag }}</router-link>
						</div>
					</div>
				</div>
			</div>
    </div>
		<!--博客信息-->
		<div class="ui attached positive message">
			<ul class="list">
				<li>作者：adada5
					<router-link to="/about">（联系作者）</router-link>
				</li>
				<li>发表时间：{{ blog.addTime | dateFormat('YYYY-MM-DD HH:mm') }}</li>
				<li>最后修改：{{ blog.updateTime | dateFormat('YYYY-MM-DD HH:mm') }}</li>
			</ul>
		</div>

		<!--评论-->
		<div class="ui bottom teal attached segment threaded comments">
			<CommentList :page="0" :blogId='blogId'/>
		</div>
  </div>
</template>

<script>
import CommentList from "@/components/comment/CommentList";
import { getBlogById } from '@/network/blog.js'
import { SET_IS_BLOG_RENDER_COMPLETE } from '@/store/mutations-types';

export default {
  data(){
		return {
			blog: {},
			tags: {},
			bigFontSize: false,
		}
	},
	components:{
		CommentList
	},
	computed: {
		blogId() {
			return this.$route.params.id
		},
	},
	beforeRouteEnter(to, from, next) {
		//路由到博客文章页面之前，应将文章的渲染完成状态置为 false
		next(vm => {
			// 当 beforeRouteEnter 钩子执行前，组件实例尚未创建
			// vm 就是当前组件的实例，可以在 next 方法中把 vm 当做 this用
			vm.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
		})
	},
	beforeRouteLeave(to, from, next) {
		// this.$store.commit(SET_FOCUS_MODE, false)
		// 从文章页面路由到其它页面时，销毁当前组件的同时，要销毁tocbot实例
		// 否则tocbot一直在监听页面滚动事件，而文章页面的锚点已经不存在了，会报"Uncaught TypeError: Cannot read property 'className' of null"
		tocbot.destroy()
		next()
	},
	beforeRouteUpdate(to, from, next) {
		// 一般有两种情况会触发这个钩子
		// ①当前文章页面跳转到其它文章页面
		// ②点击目录跳转锚点时，路由hash值会改变，导致当前页面会重新加载，这种情况是不希望出现的
		// 在路由 beforeRouteUpdate 中判断路径是否改变
		// 如果跳转到其它页面，to.path!==from.path 就放行 next()
		// 如果是跳转锚点，path不会改变，hash会改变，to.path===from.path, to.hash!==from.path 不放行路由跳转，就能让锚点正常跳转
		if (to.path !== from.path) {
			// this.$store.commit(SET_FOCUS_MODE, false)
			//在当前组件内路由到其它博客文章时，要重新获取文章
			this.getBlog(to.params.id)
			//只要路由路径有改变，且停留在当前Blog组件内，就把文章的渲染完成状态置为 false
			this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
			next()
		}
	},
	methods:{
		getBlog(id){
			getBlogById(id).then((res) => {
				if(res.meta.status === 200){
					this.blog = res.data
					this.tags = res.data.tag.split(',')
					
					//v-html渲染完毕后，渲染代码块样式
					this.$nextTick(() => {
						//添加标题id，方便目录跳转
						const h1 = document.querySelectorAll('.js-toc-content h1')	
						const h2 = document.querySelectorAll('.js-toc-content h2')
						const h3 = document.querySelectorAll('.js-toc-content h3')
						const h4 = document.querySelectorAll('.js-toc-content h4')
						const h5 = document.querySelectorAll('.js-toc-content h5')
						const h6 = document.querySelectorAll('.js-toc-content h6')
						for(let i = 0; i < h1.length ;  i++){
							h1[i].id = 'h1_' + i
						}
						for(let i = 0; i < h2.length ;  i++){
							h2[i].id = 'h2_' + i
						}
						for(let i = 0; i < h3.length ;  i++){
							h3[i].id = 'h3_' + i
						}
						for(let i = 0; i < h4.length ;  i++){
							h4[i].id = 'h4_' + i
						}
						for(let i = 0; i < h5.length ;  i++){
							h5[i].id = 'h5_' + i
						}
						for(let i = 0; i < h6.length ;  i++){
							h6[i].id = 'h6_' + i
						}

						//代码块渲染样式
						Prism.highlightAll()
						//将文章渲染完成状态置为 true
						this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, true)
					})
				}
			}).catch(() => {
					this.$message.error("请求失败")
			})
		}
	},
	created(){
		this.getBlog(this.blogId)
	}
}
</script>

<style scoped>
	.el-divider {
		margin: 1rem 0 !important;
	}

	h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
		display: block;
		content: " ";
		height: 55px;
		margin-top: -55px;
		visibility: hidden;
	}
</style>