import {request} from "./request"

// 用户登录
export function userLogin( username, password){
  return request({
    method: 'post',
    url:'/login',
    data:{
      username,
      password
    }
  })
}
