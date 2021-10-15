<template>
  <div>   
    <CommentForm v-if="formId==='-1'"/>
    <!--评论列表-->
    <div>
      <h3 class="ui dividing header">评论区</h3>
			<!-- 主评论 -->
      <div class="comment" v-for="comment in comments" :key="comment._id">
        <span class="anchor" :id="`comment-${comment._id}`"></span>
        <a class="ui circular image avatar">
					<img :src='comment.from.img'>
        </a>
        <div class="content">
          <a class="nickname" target="_blank" rel="external nofollow noopener">{{ comment.from.nickname }}</a>
          <div class="metadata">
            <strong class="date">{{ comment.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</strong>
          </div>
          <el-button size="mini" type="primary" @click="setReplay(comment._id,comment.from._id,comment._id)">回复</el-button>
          <div class="text" v-html="comment.content"></div>
        </div>
				<!-- 回复评论 -->
        <div class="comments" v-if="comment.replay.length>0">
          <div class="comment" v-for="replay in comment.replay" :key="replay._id">
            <span class="anchor"></span>
            <a class="ui circular image avatar">
              <img :src="replay.from.img">
            </a>
            <div class="content">
              <a class="nickname" target="_blank" rel="external nofollow noopener">{{ replay.from.nickname }}</a>
              <div class="metadata">
                <strong class="date">{{ replay.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</strong>
              </div>
              <div class="text">
                <a target="_blank">@{{ replay.to.nickname }}</a>
                <div>{{replay.content}}</div>
              </div>
              <div class="actions">
                <el-button size="mini" type="primary" @click="setReplay(comment._id,replay.from._id,replay._id)">回复</el-button>
              </div>
            </div>
						<CommentForm v-if="formId===replay._id"/>
          </div>
        </div>
        <div class="border"></div>
				<CommentForm v-if="formId===comment._id"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import CommentForm from './CommentForm.vue'
import { SET_REPLAY_ID,SET_FORM_ID } from '@/store/mutations-types'

export default {
  components: {CommentForm},
  computed: {
		...mapState(['comments','parentCommentId','formId'])
	},
	methods:{
		//id主评论的id to为该被回复评论的游客 formId保存回复对应评论的id
		setReplay(id,to,formId){
			this.$store.commit(SET_REPLAY_ID,{id,to})
			// 可用于设置评论框出现的位置
			this.$store.commit(SET_FORM_ID,formId)
		}
	},
	created(){
		
	}
}
</script>

<style scoped>
  .comments + .border {
		position: absolute;
		left: 34px;
		top: 47px;
		bottom: 0;
		border-style: solid;
		border-width: 0 0 0 1px;
		border-color: #e0e0e0;
	}

	.ui.threaded.comments .comment .comments {
		box-shadow: none;
		margin-top: -2em;
	}

	.comment {
		padding-right: 2em !important;
		padding-left: 1em !important;
	}

	.nickname {
		font-weight: bolder;
		color: #000;
	}

	.comment .el-button {
		margin-left: 5px;
		padding: 4px 5px;
	}

	.comment > .anchor {
		position: absolute;
		left: 0;
		top: -48px;
	}

	.comment .comments .comment > .anchor {
		top: -55px;
	}

	.ui.comments .comment .avatar {
		width: 40px !important;
		margin: 0;
	}

	.ui.comments .comment .text {
		white-space: pre-wrap !important;
		margin-top: 7px;
		line-height: 1.5;
	}

	.ui.comments .comment .text a {
		cursor: pointer;
		margin-right: 8px;
		font-weight: bolder;
		color: rgba(0, 0, 0, .87);
	}

	.ui.comments .comment .text div {
		display: inline;
	}

	.label {
		cursor: default;
		padding: 4px 6px !important;
		font-weight: 500 !important;
	}

	.comment .form {
		margin-top: 20px;
	}
</style>