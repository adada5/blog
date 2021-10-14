<template>
  <el-pagination @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
                :page-size="queryInfo.pagesize" :total="totalPage"
                layout="prev, pager, next" background>
  </el-pagination>
</template>

<script>
export default {
  props:{
    totalPage: {
      type: Number,
      required: true
    },
  },
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
    }
  },
  methods:{
    handleCurrentChange(newPage){
      this.pagenum = newPage
      this.$emit('handleCurrentChange',newPage)
    }
  }
  
}
</script>

<style scoped>

</style>