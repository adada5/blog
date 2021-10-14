import {request} from "./request"

//根据url删除照片的请求方法
export function deleteImage( url ){
  return request({
    method: 'put',
    url:'/delete',
    data:{
      url
    },  
  })
}
