<template>
  <div class="site">
    <!-- 顶部导航 -->
    <Nav :categoryList="categorys" :blogName="blogName"></Nav>

    <div class="main">
			<div class="m-padded-tb-big">
				<div class="ui container">
					<div class="ui stackable grid">
						<!--左侧-->
						<div class="three wide column m-mobile-hide">
							<Introduction />
						</div>
						<!--中间-->
						<div class="ten wide column">
							<keep-alive include="Home">
								<router-view/>
							</keep-alive>
						</div>
						<!--右侧-->
						<div class="three wide column m-mobile-hide">
							<tags :tagList='tagList'></tags>
              <!--只在文章页面显示目录-->
							<Tocbot v-if="$route.name==='Blog'"/>
						</div>
					</div>
				</div>
			</div>
		</div>
   
    <Footer></Footer>
  </div>
</template>

<script>
import { getTags } from '@/network/tag.js'
import { getCategorys } from '@/network/category.js'
import Nav from "@/components/index/Nav";
import Introduction from "@/components/sidebar/Introduction"
import Tags from '@/components/sidebar/Tags'
import Tocbot from "@/components/sidebar/Tocbot";
import Footer from "@/components/index/Footer";
import { RESTORE_COMMENT_FORM } from "@/store/mutations-types";

export default {
  data() {
    return {
      blogName:'Blog',
      activeIndex: '1',
      input: '',
      categorys: [],
      tagList: [],
    };
  },
  components:{
    Nav,
		Introduction,
    Tags,
    Tocbot,
    Footer
  },
  methods: {
		//获取小标签
    async getTags(){
      const res = await getTags()
      this.tagList = res.data
      console.log(res)
    },
    //获取分类
    async getCategorys(){
      // console.log(1)
      const res =  await getCategorys(this.queryInfo)
      console.log(res)
      this.categorys = res.data
      console.log(this.categorys)

    },
  },
  created(){
    this.getTags()
    this.getCategorys()
		// 从localStorage获取评论nickname email
		this.$store.commit(RESTORE_COMMENT_FORM)
  }
}
</script>

<style  scoped>
  .site {
		display: flex;
		min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
		flex-direction: column;
	}

	.main {
		margin-top: -10px;
		flex: 1;
	}

	.main .ui.container {
		width: 1400px !important;
		margin-left: auto !important;
		margin-right: auto !important;
	}

	.ui.grid .three.column {
		padding: 0;
	}

	.ui.grid .ten.column {
		padding-top: 0;
	}

	.m-display-none {
		display: none !important;
	}
</style>