import { 
	SET_PARENT_COMMENT_ID,
	SET_BLOG_ID,
	SAVE_COMMENT_RESULT,
  RESET_COMMENT_FORM
} from './mutations-types'

import { addComment,getComment } from '@/network/comment'
import jsonp from '@/util/jsonp'

export default {
  // 获取评论
  async getCommentList({commit, rootState}) {
    const res = await getComment(rootState.blogId)
    commit(SAVE_COMMENT_RESULT,res.data)
    console.log(res)
  },
  // 提交评论
  submitCommentForm({rootState, dispatch, commit}){
    let form = {...rootState.commentForm}
    form.img = ''
    //被回复的评论id
    let id = rootState.parentCommentId
    //判断是否qq号的正则表达式
    const reg = /^[1-9][0-9]{4,10}$/
    //获取博客id
    form.blogId = rootState.blogId

    console.log('评论的名称',form.nickname) 
    console.log('是否为qq号：',reg.test(form.nickname))

    //不是qq号直接网络请求
    if(!reg.test(form.nickname)){
      addComment(id,form).then((res)=>{
        console.log(res)
        commit(SET_PARENT_COMMENT_ID,'-1')
        commit(RESET_COMMENT_FORM)
        dispatch('getCommentList')
      })
    }else{
      jsonp('http://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg',
      {
        uins: form.nickname,
      },
      { 
        jsonp: 'callback',
        callback: 'portraitCallBack'
      })
      .then(res=>{
        console.log(res[form.nickname])
        form.img = 'https://q4.qlogo.cn/g?b=qq&s=100&nk='+ form.nickname
        form.nickname = res[form.nickname][6]
        console.log(form.nickname)
        console.log(form.img)
        addComment(id,form).then((res)=>{
          console.log(res)
          commit(SET_PARENT_COMMENT_ID,'-1')
          commit(RESET_COMMENT_FORM)
          dispatch('getCommentList')
        })
      })
    }
 
  }
}