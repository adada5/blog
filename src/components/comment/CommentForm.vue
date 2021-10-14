<template>
  <div>
    <!-- 评论输入表单 -->
    <div class="form">
      <h3>
        发表评论
        <el-button class="m-small" size="mini" type="primary" @click="setId" v-show="formId!== '-1'">取消回复</el-button>
      </h3>
      <el-form :inline="true" :model="commentForm" :rules="formRules" ref="formRef" size="small">
        <el-input :class="'textarea'" type="textarea" :rows="5" v-model="commentForm.content" placeholder="评论千万条，友善第一条" maxlength="250" show-word-limit :validate-event="false"></el-input>
        <el-form-item prop="nickname">
          <el-popover ref="nicknamePopover" placement="bottom" trigger="focus" content="输入QQ号将自动拉取昵称和头像"></el-popover>
          <el-input v-model="commentForm.nickname" placeholder="昵称（必填）" :validate-event="false" v-popover:nicknamePopover>
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-popover ref="emailPopover" placement="bottom" trigger="focus" content="用于保存用户信息"></el-popover>
          <el-input v-model="commentForm.email" placeholder="邮箱（必填）" :validate-event="false" v-popover:emailPopover>
            <i slot="prefix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" size="medium" @click="postForm">发表评论</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>  
</template>

<script>
import {mapState} from 'vuex'
import {	SET_FORM_ID } from '@/store/mutations-types';

export default {
	computed: {
		...mapState(['parentCommentId', 'formId', 'commentForm'])
	},
  data(){
    return {
      formRules: {
        nickname: [
          {required: true, message: '请输入评论昵称'},
          {max: 18, message: '昵称不可多于15个字符'}
        ],
        email: [
          {required: true, message: '请输入评论邮箱'},
          // {validator: checkEmail}
        ],
      },
    }
  },
	methods:{
		postForm(){
			this.$store.dispatch('submitCommentForm')
		},
		setId(){
			this.$store.commit(SET_FORM_ID, '-1')
		}
	}

}
</script>

<style scoped>
  .form {
      background: #fff;
      position: relative;
	}

	.form h3 {
		margin: 5px;
		font-weight: 500 !important;
	}

	.form .m-small {
		margin-left: 5px;
		padding: 4px 5px;
	}

	.el-form .textarea {
		margin-top: 5px;
		margin-bottom: 15px;
	}

	.el-form textarea {
		padding: 6px 8px;
	}

	.el-form textarea, .el-form input {
		color: black;
	}

	.el-form .el-form-item__label {
		padding-right: 3px;
	}

	
	.mask {
		pointer-events: auto;
		position: fixed;
		z-index: 99;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.el-input{
		    width: 27em!important;
	}
</style>