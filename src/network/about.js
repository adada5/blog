import {request} from "./request"

//about页面数据请求
export function getAbout(){
  return request({
    method: 'get',
    url: '/about',
  })
}
