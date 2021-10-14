<template>
  <div>
    <el-button @click="addDialogVisible = true">添加标签</el-button>
    <el-table
    :data="tagData"
    style="width: 100%"
    :border="true"
    stripe>
      <el-table-column
        prop="name"
        label="标签名"
        >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row._id,scope.row.name)" >修改</el-button>


          <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @confirm="doDeleteTag(scope.row._id)">
            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
          </el-popconfirm> 
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改标签对话框 -->
    <el-dialog
      title="标签修改"
      :visible.sync="editDialogVisible"
      width="30%">
      <!-- 主体 -->
      <el-form :model="editForm" ref="editFormRef" label-width="80px">
				<el-form-item label="标签名" >
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
			</el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doEditTag">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加标签对话框 -->
    <el-dialog
      title="添加标签"
      :visible.sync="addDialogVisible"
      width="30%">
      <!-- 主体 -->
      <el-form :model="addForm" ref="addFormRef" label-width="80px">
				<el-form-item label="标签名" >
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
			</el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddTag">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { addTag, deleteTag, editTag } from '@/network/tag.js'

export default {
  props:{
    tagData: {
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
      this.editForm.id = id 
      this.editForm.name = name
      this.editDialogVisible = true
    },
    async doDeleteTag(id){
      const res = await deleteTag(id)
      console.log(res)
      if(res.meta.status !== 200){
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.$emit('updateTag')
    },
    async doEditTag(){
      const res = await editTag(this.editForm.id,this.editForm.name)
      console.log(res)
      if(res.meta.status !== 200){
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.editDialogVisible = false
      this.$emit('updateTag')
    },
    async doAddTag(){
      const res = await addTag(this.addForm.name)
      console.log(res)
      if(res.meta.status !== 200){
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.addForm.name = ''
      this.addDialogVisible = false 
      this.$emit('updateTag')
    }
  }
}
</script>

<style scoped>

</style>