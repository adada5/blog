import {request} from "./request"

//获取标签
export function getTags(){
  return request({
    method: 'get',
    url:'/tag'
  })
}

