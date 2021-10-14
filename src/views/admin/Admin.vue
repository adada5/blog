<template>
  <el-card>
    <div>
      <el-button type="info" @click="logout">退出</el-button>
      
      <template>
        <el-tabs v-model="activeName" >
          <el-tab-pane label="博客管理" name="first">
            <el-button @click="addArticle">添加博客</el-button>
            <el-table
            :data="articleData"
            style="width: 100%"
            :border="true"
            stripe>
              <el-table-column
                prop="title"
                label="标题"
                >
              </el-table-column>
              <el-table-column
                prop="description"
                label="描述"
                >
              </el-table-column>
              <el-table-column
                label="创建时间"
              >
              <template v-slot="scope">
                {{scope.row.addTime | dateFormat}}
              </template>
              </el-table-column>
              <el-table-column
                label="修改时间"
              >
              <template v-slot="scope">
                {{scope.row.updateTime | dateFormat}}
              </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="200">
                <template v-slot="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="goEditPage(scope.row._id)" >修改</el-button>


                  <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @confirm="deleteArticles(scope.row._id)">
                    <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference" >删除</el-button>
                  </el-popconfirm>
                  
                </template>
              </el-table-column>
            </el-table>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
                      :page-sizes="[1, 2, 5]" :page-size="queryInfo.pagesize" :total="total"
                      layout="total, sizes, prev, pager, next, jumper" background>
            </el-pagination>

          </el-tab-pane>
          <el-tab-pane label="动态管理" name="second">
            <Moment-manage></Moment-manage>
          </el-tab-pane>
          <el-tab-pane label="分类管理" name="third">
            <Category-manage :categoryData="categoryData"  @updateCategory='getCategorys'/>
          </el-tab-pane>
          <el-tab-pane label="标签管理" name="fourth">
            <Tag-manage :tagData='tagData'
            @updateTag='getTags'/>
          </el-tab-pane>
          <el-tab-pane label="关于我页面管理" name="fifth">
            <About-manage></About-manage>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </el-card>
</template>

<script>
import { getArticles, deleteArticles } from '@/network/article.js'
import { getCategorys } from '@/network/category.js'
import { getTags } from '@/network/tag.js'
import CategoryManage from './childComps/categoryManage/CategoryManage.vue'
import TagManage from './childComps/tagManage/TagManage.vue'
import MomentManage from './childComps/momentManage/MomentManage.vue'
import AboutManage from './childComps/aboutManage/AboutManage.vue'

export default {
  data(){
    return {
      queryInfo: {
        //查询语句
        query: '',
        //当前页码
        pagenum: 1,
        //每页显示条数
        pagesize: 5
      },
      total: 0,
      activeName:'first',
      articleData:[],
      categoryData:[],
      tagData:[]
    }
  },
  components:{
    CategoryManage,
    TagManage,
    MomentManage,
    AboutManage
  },
  methods: {
    logout(){
      window.sessionStorage.clear()
      this.$router.push("/login")
    },
    addArticle(){
      this.$router.push('/admin/addartcle')
    },
    async getArticles(){
      // console.log(1)
      const res =  await getArticles(this.queryInfo)
      // console.log(res)
      this.articleData = res.data.articles
      this.total = res.data.totalpage
      // console.log(this.articleData)
      // console.log(this.total)
    },
    //获取分类
    async getCategorys(){
      // console.log(1)
      const res =  await getCategorys()
      console.log(res)
      this.categoryData = res.data
      // this.total = res.data.totalpage
      console.log(this.categoryData)
      // console.log(this.total)
    },
    //获取标签
    async getTags(){
      // console.log(1)
      const res =  await getTags()
      console.log(res)
      this.tagData = res.data
      // this.total = res.data.totalpage
      console.log(this.tagData)
      // console.log(this.total)
    },
    // 监听展示pagesize改变的事件
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getArticles()
    },
    // 监听页码改变的事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getArticles()  
    },
    //删除文章
    async deleteArticles(id){
      const res =  await deleteArticles(id)
      this.getArticles()  
    },
    //前往修改页面
    goEditPage(id){
      this.$router.push(`/admin/editartcle/${id}`)
    },
  },
  created(){
    // this.articleData = 
    this.getArticles()
    this.getCategorys()
    this.getTags()
  },
}
</script>

<style scoped>

</style>