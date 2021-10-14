import {request} from "./request"

// 提交评论
export function addComment(id,{
  blogId,
  content,
  nickname,
  email,
  to,
  img
}){
  return request({
    method: 'post',
    url:'/addcomment',
    params: {
      //回复评论的id
      id,
    },
    data:{
      blogId,
      content,
      nickname,
      email,
      to,
      img
    }
  })
}

// 获得评论
export function getComment(id){
  return request({
    method: 'get',
    url:'/comment',
    params: {
      //blog的id
      id,
    }
  })  
}