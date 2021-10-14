import {request} from "./request"
//  文章 = 博客

//添加文章的请求方法
export function addArticle( 
  { title,
    description,
    descriptionTemplate,
    content,
    contentTemplate,
    category,
    tag }){
  return request({
    method: 'post',
    url:'/add',
    data:{
      title,
      description,
      descriptionTemplate,
      content,
      contentTemplate,
      category,
      tag
    }
  })
}

//分页查询文章的请求方法
export function getArticles( 
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
    url:'/articles',
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

//根据id删除文章的请求方法
export function deleteArticles(id){
  return request({
    method: 'delete',
    url:'/articles',
    params: {
      //被删除的id
      id,
    }
  })
}

//根据id获取文章的请求方法
export function getArticlesById(id){
  return request({
    method: 'get',
    url:'/article',
    params: {
      //查询文章的id
      id,
    }
  })
}

//根据id编辑文章的请求方法
export function editArticle(id, 
  { title,
    description,
    descriptionTemplate,
    content,
    contentTemplate,
    category,
    tag }){
  return request({
    method: 'put',
    url:'/edit',
    params: {
      //被编辑的id
      id,
    },
    data:{
      title,
      description,
      descriptionTemplate,
      content,
      contentTemplate,
      category,
      tag
    },  
  })
}