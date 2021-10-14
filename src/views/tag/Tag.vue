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
      console.log(this.queryInfo.tag)
      const res =  await getBlogs(this.queryInfo)
      // console.log(res)
      this.blogList = res.data.blogs
      this.total = res.data.totalpage
      console.log(this.blogList)
      // console.log(this.total)
    },
    // 监听页码改变的事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getBlogList()  
    },
  },
  watch:{
    //在当前组件被重用时，要重新获取博客列表
    '$route.fullPath'() {
      if (this.$route.name === 'tag') {
        console.log(this.$route)
        this.queryInfo.tag = this.$route.params.tag
        this.getBlogList()
      }
    }
	},
  created(){
    this.queryInfo.tag = this.$route.params.tag
    this.getBlogList()
    // console.log(this.$route.params.cate)
    console.log(this.$route)
  },
  components:{
    BlogList
  }
}
</script>

<style scoped>

</style>