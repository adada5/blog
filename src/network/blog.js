import {request} from "./request"

//分页查询博客的请求方法
export function getBlogs( 
  {
    //查询语句
    query,
    //当前页码
    pagenum,
    //每页显示条数
    pagesize,
    //分类
    category,
    //标签
    tag
  }){
  return request({
    method: 'get',
    url:'/blogs',
    params: {
      //查询语句
      query,
      //当前页码
      pagenum,
      //每页显示条数
      pagesize,
      //分类
      category,
      //标签
      tag
    }
  })
}

//根据id获取博客的请求方法
export function getBlogById(id){
  return request({
    method: 'get',
    url:'/blog',
    params: {
      //被删除的id
      id,
    }
  })
}

//博客查询
export function blogQuerySearch(query){
  return request({
    method: 'get',
    url: '/querysearch',
    params: {
      query
    }
  })
}