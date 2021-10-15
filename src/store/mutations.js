import { 
	SET_IS_BLOG_RENDER_COMPLETE,
	SET_PARENT_COMMENT_ID,
	SET_BLOG_ID,
	SAVE_COMMENT_RESULT,
	SET_REPLAY_ID,
	RESET_COMMENT_FORM,
	RESTORE_COMMENT_FORM,
	SET_FORM_ID
} from './mutations-types'

export default {
	// 设置博客文章渲染完成
  [SET_IS_BLOG_RENDER_COMPLETE](state, ok) {
		state.isBlogRenderComplete = ok
	},
	
	// 设置主评论的id
	[SET_PARENT_COMMENT_ID](state, parentCommentId) {
		state.parentCommentId = parentCommentId
	},
	
	// 设置博客id
	[SET_BLOG_ID](state, id) {
		state.blogId = id
	},

	// 保存评论列表
	[SAVE_COMMENT_RESULT](state, data) {
		state.comments = data
	},
	
	// 设置回复评论的
	[SET_REPLAY_ID](state, payload) {
		state.parentCommentId = payload.id
		state.commentForm.to = payload.to
	},

	// 重置回复框内容，保存访客信息
	[RESET_COMMENT_FORM](state) {
		const commentForm = {
			nickname: state.commentForm.nickname,
			email: state.commentForm.email,
		}
		//保存访客信息，下次评论时自动填充表单
		window.localStorage.setItem('commentForm', JSON.stringify(commentForm))
		state.commentForm.content = ''
		state.commentForm.to = ''
		state.formId = '-1'
	},

	// 从localStorage拿到nickname email
	[RESTORE_COMMENT_FORM](state) {
		const lastForm = JSON.parse(window.localStorage.getItem('commentForm'))
		if (lastForm) {
			state.commentForm.nickname = lastForm.nickname
			state.commentForm.email = lastForm.email
		}
	},

	// 设置评论框出现的位置
	[SET_FORM_ID](state, id) {
		state.formId = id
	},
}