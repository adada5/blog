import {request} from "./request"


//分页查询动态的请求方法
export function getMoments( 
  {
    //查询语句
    query,
    //当前页码
    pagenum,
    //每页显示条数
    pagesize
  }){
  return request({
    method: 'get',
    url:'/moments',
    params: {
      //查询语句
      query,
      //当前页码
      pagenum,
      //每页显示条数
      pagesize
    }
  })
}

//点赞动态
export function addLike(id){
  return request({
    method: 'post',
    url: 'like',
    params: {
      id
    }
  })
}

//添加动态
export function addMoment({content,contentTemplate}){
  return request({
    method:'post',
    url:'/momentadd',
    data: {
      content,
      contentTemplate
    }
  })
}

//删除动态
export function deleteMoment(id){
  return request({
    method:'delete',
    url:'/momentdelete',
    params: {
      id
    }
  })
}

//获取动态
export function getMomentById(id){
  return request({
    method:'get',
    url:'/moment',
    params: {id}
  })
}

//编辑动态
export function editMoment(id,{content,contentTemplate}){
  return request({
    method: 'put',
    url: '/momentedit',
    params: { id },
    data: {
      content,contentTemplate
    }
  })
}