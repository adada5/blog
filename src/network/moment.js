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

