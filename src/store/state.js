export default {
	//博客id
	blogId: '-1',
  //博客文章渲染完成的标记
	isBlogRenderComplete: false,
  //主评论的id
  parentCommentId: '-1',
	//控制评论框出现的id
	formId: '-1',
  //评论的表格
	commentForm: {
		content: '',
		nickname: '',
		email: '',
		to: ''
	},
	//评论列表
	comments: []
}