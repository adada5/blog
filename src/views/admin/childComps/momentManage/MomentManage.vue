<template>
  <div>
    <el-button @click="addMoment">添加动态</el-button>

    <el-table
    :data="MomentData"
    style="width: 100%"
    :border="true"
    stripe>
      <el-table-column
        prop="content"
        label="内容"
        >
      </el-table-column>
      <el-table-column
        label="创建时间"
      >
      <template v-slot="scope">
        {{scope.row.createTime | dateFormat}}
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
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMoment(scope.row._id)" >修改</el-button>


          <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @confirm="deleteMoment(scope.row._id)">
            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference" >删除</el-button>
          </el-popconfirm>
          
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5]" :page-size="queryInfo.pagesize" :total="total" layout="total, sizes, prev, pager, next, jumper" background>
    </el-pagination>
  </div>
</template>

<script>
import { getMoments,deleteMoment } from '@/network/moment'

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
      MomentData:[]
    }
  },
  methods: {
    //添加动态
    addMoment(){
      this.$router.push('/admin/addmoment')
    },
    //编辑动态
    editMoment(id){
      this.$router.push(`/admin/editmoment/${id}`)
    },
    //删除动态
    async deleteMoment(id){
      const res = await deleteMoment(id)
      this.getMoments()
    },
    async getMoments(){
      const res = await getMoments(this.queryInfo)
      this.total = res.data.totalpage
      this.MomentData = res.data.moments
      console.log(res)
    },
    // 监听展示pagesize改变的事件
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getMoments()
    },
    // 监听页码改变的事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getMoments()  
    },
  },
  created(){
    this.getMoments()
  }
    
}
</script>

<style>

</style>