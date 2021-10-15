<template>
	<div class="ui inverted attached segment m-padded-tb-no m-shadow-small">
		<div class="ui container">
      <div class="ui inverted secondary stackable menu">
				<!-- 导航 -->
				<router-link to="/"><h2 class="ui teal header item">{{blogName}}</h2></router-link> 
        <router-link to="/home" class="m-item item" :class="{'m-mobile-hide': mobileHide ,'active':$route.name==='home'}"> <i class="home icon"></i> 首页</router-link>
				<el-dropdown  trigger="click" @command="categoryRoute" class="m-item item" :class="{'m-mobile-hide': mobileHide ,'active':$route.name==='category'}">
					<span class="el-dropdown-link">
						<i class="idea icon"></i>分类<i class="caret down icon"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="category.name" v-for="(category,index) in categoryList" :key="category._id" >{{category.name}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
        <router-link to="/archives" class="m-item item" :class="{'m-mobile-hide': mobileHide ,'active':$route.name==='archives'}"> <i class="clone icon"></i>归档</router-link>
				<router-link to="/moments" class="m-item item" :class="{'m-mobile-hide': mobileHide,'active':$route.name==='moments'}"> <i class="comment alternate outline icon"></i>动态</router-link>
        <router-link to="/about" class="m-item item" :class="{'m-mobile-hide': mobileHide,'active':$route.name==='about'}"> <i class="info icon"></i>关于我</router-link>

				<!-- 收索框 -->
				<el-autocomplete v-model="queryString" :fetch-suggestions="debounceQuery" placeholder="Search..."
			                 class="right item m-search " :class="{'m-mobile-hide': mobileHide}"
			                 popper-class="m-search-item" @select="handleSelect">
					<i class="search icon el-input__icon" slot="suffix"></i>
					<template slot-scope="{ item }">
						<div class="title">{{ item.title }}</div>
					</template>
				</el-autocomplete>

      </div>
    </div> 
		<!-- 移动端展开导航 -->
    <a href="#" class="ui m-menu m-toggle black icon button m-right-top m-mobile-show" @click="sidebarClick">
      <i class="sidebar icon"></i>
    </a>
	</div>
</template>

<script>
	import { blogQuerySearch } from '@/network/blog'
	export default{
		props: {
			blogName: {
				type: String,
				required: true
			},
			categoryList: {
				type: Array,
				required: true
			},
		},
		data(){
			return {
					mobileHide:true,
					queryString: '',
					queryResult: []
				}; 
		},
		methods:{
			// 移动端导航展开切换
			sidebarClick(){
				this.mobileHide = !this.mobileHide
			},
			categoryRoute(name) {
				//防止重复路由跳转同一个分类地址
				if(this.$route.path.indexOf(name) == -1)
				this.$router.push(`/category/${name}`)
			},
			// 防抖
			debounceQuery(queryString, callback) {
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(() => this.querySearchAsync(queryString, callback), 1000)
			},
			// 收索请求
			querySearchAsync(queryString, callback) {
				// 预处理
				if (queryString == null 
						|| queryString.trim() === ''
						|| queryString.indexOf('%') !== -1
						|| queryString.indexOf('_') !== -1
						|| queryString.indexOf('[') !== -1
						|| queryString.indexOf('#') !== -1
						|| queryString.indexOf('*') !== -1
						|| queryString.trim().length > 20) {
					return
				}

				blogQuerySearch(queryString).then(res => {
					if(res.meta.status === 200 ){
						this.queryResult = res.data
						if(this.queryResult.length === 0){
							this.queryResult.push({title: '无相关搜索结果'})
						}
						callback(this.queryResult)
					}
				})
			},
			// 处理点击事件
			handleSelect(item) {
				if (item._id) {
					this.$router.push(`/blog/${item._id}`)
				}
			}
		}
	}
</script>

<style>
 	.el-dropdown-link {
		color: #abacac !important;
		font-size: 14px;
		outline-style: none !important;
		outline-color: unset !important;
		height: 100%;
		cursor: pointer;
	}

	.el-dropdown-menu {
		margin: 7px 0 0 0 !important;
		padding: 0 !important;
		border: 0 !important;
		background: #1b1c1d !important;
	}

	.el-dropdown-menu__item {
		padding: 0 15px !important;
		color: rgba(255, 255, 255, .9) !important;
	}

	.el-dropdown-menu__item:hover {
		background: rgba(255, 255, 255, .08) !important;
	}
</style>