import {request} from "./request"

//获取标签
export function getTags(){
  return request({
    method: 'get',
    url:'/tag'
  })
}

//添加标签
export function addTag( 
  name){
  return request({
    method: 'post',
    url:'/tagadd',
    data:{
      name
    }
  })
}

//根据id删除分类的请求方法
export function deleteTag(id){
  return request({
    method: 'delete',
    url:'/tagdelete',
    params: {
      //被删除的id
      id,
    }
  })
}

//根据id编辑分类的请求方法
export function editTag( id, name ){
  return request({
    method: 'put',
    url:'/tagedit',
    params: {
      //被编辑的id
      id,
    },
    data:{
      name
    },  
  })
}
