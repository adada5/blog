<template>
  <div>
    <blog-item v-for="(item,index) in blogList" :blog = "item" :key="item._id" ></blog-item>
    <pagination :totalPage='totalPage' @handleCurrentChange='handleCurrentChange'></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/blog/Pagination'
import BlogItem from '@/components/blog/BlogItem'

export default {
  components: {Pagination, BlogItem},
  props:{
    blogList: {
      type: Array,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    },   
  },
  methods:{
    handleCurrentChange(newPage){
      this.$emit('handleCurrentChange',newPage)
    }
  }
}
</script>

<style scoped>

</style>