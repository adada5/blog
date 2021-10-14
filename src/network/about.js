import {request} from "./request"

//about页面数据请求
export function getAbout(){
  return request({
    method: 'get',
    url: '/about',
  })
}

//about页面数据请求
export function eidtAbout(id,{content,contentTemplate}){
  return request({
    method: 'put',
    url: '/aboutedit',
    params: { id },
    data: {
      content,contentTemplate
    }
  })
}