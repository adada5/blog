import {request} from "./request"

//获取分类
export function getCategorys(){
  return request({
    method: 'get',
    url:'/category'
  })
}

//根据id编辑分类的请求方法
export function editCategory( id, name ){
  return request({
    method: 'put',
    url:'/categoryedit',
    params: {
      //被编辑的id
      id,
    },
    data:{
      name
    },  
  })
}

//根据id删除分类的请求方法
export function deleteCategory(id){
  return request({
    method: 'delete',
    url:'/categorydelete',
    params: {
      //被删除的id
      id,
    }
  })
}

//添加分类的请求方法
export function addCategory( 
  name){
  return request({
    method: 'post',
    url:'/categoryadd',
    data:{
      name
    }
  })
}