<template>
  <div>    
    <blog-list :blogList='blogList' :totalPage='total' @handleCurrentChange='handleCurrentChange'></blog-list>
  </div>
</template>

<script>
import { getBlogs } from '@/network/blog.js'
import BlogList from '@/components/blog/BlogList'

export default {
  data(){
    return {
      queryInfo: {
        //查询语句
        query: '',
        //当前页码
        pagenum: 1,
        //每页显示条数
        pagesize: 5,
        //分类
        category: '',
        //标签
        tag:''
      },
      total: 0,
      blogList:[]
    }
  },
  methods: {
    // 获取列表数据
    async getBlogList(){
      const res =  await getBlogs(this.queryInfo)
      this.blogList = res.data.blogs
      this.total = res.data.totalpage
    },
    // 监听页码改变的事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getBlogList()  
    },
  },
  created(){
    this.getBlogList()
  },
  components:{
    BlogList
  }
}
</script>

<style scoped>

</style>