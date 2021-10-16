import {request} from "./request"

//获取分类
export function getCategorys(){
  return request({
    method: 'get',
    url:'/category'
  })
}
