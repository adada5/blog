<template>
  <div>
    <el-button @click="addDialogVisible = true">添加分类</el-button>
    <el-table
    :data="categoryData"
    style="width: 100%"
    :border="true"
    stripe>
      <el-table-column
        prop="name"
        label="类名"
        >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row._id,scope.row.name)" >修改</el-button>


          <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @confirm="doDeleteCategory(scope.row._id)">
            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
          </el-popconfirm> 
        </template>
      </el-table-column>

    </el-table>

    <!-- 修改分类对话框 -->
    <el-dialog
      title="分类修改"
      :visible.sync="editDialogVisible"
      width="30%">
      <!-- 主体 -->
      <el-form :model="editForm" ref="editFormRef" label-width="80px">
				<el-form-item label="分类名" >
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
			</el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doEditCategory">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="30%">
      <!-- 主体 -->
      <el-form :model="addForm" ref="addFormRef" label-width="80px">
				<el-form-item label="分类名" >
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
			</el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editCategory, deleteCategory, addCategory } from '@/network/category.js'

export default {
  props:{
    categoryData: {
      type: Array,
      required: true
    },
  },
  data(){
    return {
      editDialogVisible:false,
      addDialogVisible:false,
      editForm:{
        id:'',
        name:''
      },  
      addForm:{
        name:''
      }  
    }
  },

  methods:{
    showEditDialog(id,name){
      this.editDialogVisible = true
      this.editForm.id = id 
      this.editForm.name = name
    },
    async doEditCategory(){ 
      const res = await editCategory(this.editForm.id,this.editForm.name)
      console.log(res)
      if(res.meta.status !== 200){
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.editDialogVisible = false
      this.$emit('updateCategory')
    },
    async doDeleteCategory(id){
      const res = await deleteCategory(id)
      console.log(res)
      if(res.meta.status !== 200){
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.$emit('updateCategory')
    },
    async doAddCategory(){
      const res = await addCategory(this.addForm.name)
      console.log(res)
      if(res.meta.status !== 200){
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.addForm.name = ''
      this.addDialogVisible = false 
      this.$emit('updateCategory')
    }
  }
}
</script>

<style scoped>

</style>