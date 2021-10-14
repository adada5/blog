import {request} from "./request"

// 获取归档数据
export function getArchives(){
  return request({
    method: 'get',
    url:'/archive'
  })
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          