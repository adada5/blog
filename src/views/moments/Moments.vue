<template>
  <div>
		<!-- 头部区域 -->
		<div class="ui top attached segment" style="text-align: center">
			<h2 class="m-text-500">我的动态</h2>
		</div>

		<!-- 动态主体 -->
		<div class="ui attached segment m-padding-bottom-large">
			<div class="moments">
				<div class="moment" v-for="(moment,index) in moments" :key="index">
					<div class="avatar">
						<img :src="moment.avatar">
					</div>
					<div class="ui card">
						<div class="content m-top">
							<span style="font-weight: 700">{{moment.nickname}}</span>
							<span class="right floated">{{ moment.createTime | dateFromNow }}</span>
						</div>
						<div class="content typo" v-html="moment.content"></div>
						<div class="extra content">
							<a class="left floated" @click="addLike(moment._id)">
								<i class="heart icon"  :class="isLike(moment._id)?'like-color':'outline'" >{{ moment.likes }}</i>
							</a>
						</div>
					</div>
				</div>
			</div>	

			<!-- 分页 -->
			<el-pagination @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" :total="total" layout="prev, pager, next" background class="pagination">
			</el-pagination>
		</div>

  </div>

</template>

<script>
import { getMoments, addLike } from '@/network/moment'
export default {
	data(){
		return {
			queryInfo: {
        //查询语句
        query: '',
        //当前页码
        pagenum: 1,
        //每页显示条数
        pagesize: 5
      },
      total: 0,
			moments: [],
			likeIdList: JSON.parse(window.localStorage.getItem('likes') || "[]")
		}
	},
	watch: {
		likeIdList(newValue){
			window.localStorage.setItem('likes',JSON.stringify(newValue))
		}
	},
	computed: {
		isLike(){
			return function (id) {
				return this.likeIdList.indexOf(id) > -1
			}
		}
	},
	methods:{
		async getMoments(){
			const res = await getMoments(this.queryInfo)
			this.moments = res.data.moments
			this.total = res.data.totalpage
			console.log(res)
		},
		async addLike(id){
			if(this.likeIdList.indexOf(id) === -1){
				const res = await addLike(id)
				this.likeIdList.push(id)
				// 让已动态数组中被点赞的动态点赞数加，避免再次请求
				this.moments.map((item) =>{
					if(item._id === id){
						item.likes ++
						return item
					}
					return item
				})
			}	
		},
		handleCurrentChange(newPage) {
				this.queryInfo.pagenum = newPage
				this.getMoments()
		},
	},
	created(){
		this.getMoments()
	}
}
</script>

<style scoped>
  .avatar {
		margin-left: -62.5px;
		float: left !important;
	}

	.avatar img {
		height: 45px;
		width: 45px;
		border-radius: 500px;
	}

	.moments {
		margin-left: 26px !important;
		padding-left: 40px !important;
		border-left: 1px solid #dee5e7 !important;
	}

	.moment {
		margin-top: 30px;
	}

	.moment:first-child {
		margin-top: 0 !important;
	}

	.card {
		width: 100% !important;
	}

	.card:before {
		border-width: 0 0 1px 1px !important;
		transform: translateX(-50%) translateY(-50%) rotate(45deg) !important;
		bottom: auto !important;
		right: auto !important;
		top: 22px !important;
		left: 0 !important;
		position: absolute !important;
		content: '' !important;
		background-image: none !important;
		z-index: 2 !important;
		width: 12px !important;
		height: 12px !important;
		transition: background .1s ease !important;
		background-color: inherit !important;
		border-style: solid !important;
		border-color: #d4d4d5 !important;
	}

	.content.m-top {
		padding: 10px 14px !important;
	}

	.content .right.floated {
		font-size: 12px !important;
	}

	.content.typo * {
		font-size: 14px !important;
	}

	.extra.content {
		padding: 5px 14px !important;
	}

	.extra.content a {
		color: rgba(0, 0, 0, 0.7) !important;
		font-size: 12px !important;
	}

	.extra.content a:hover {
		color: red !important;
	}

	.extra.content .like-color {
		color: red !important;
	}

	.extra.content i {
		font-size: 12px !important;
	}

	.pagination {
		text-align: center;
		margin-top: 3em;
	}
</style>