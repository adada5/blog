<template>
  <div>

    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-position="top">   
      <el-tabs v-model="activeIndex" tab-position="left" >
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="标题" >
            <el-input v-model="addForm.title" ></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="addForm.category" placeholder="请选择文章分类">
              <el-option v-for="item in categoryData" :label="item.name" :value="item.name" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" >
              <el-checkbox-group 
                v-model="addForm.tag">
                <el-checkbox v-for="item in Tags" :label="item.name" :key="item._id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>          
      </el-tab-pane>
    
      <el-tab-pane label="文章描述" name="1">
        <el-form-item label="描述" >
          <mavon-editor ref=dmd v-model="addForm.descriptionTemplate" @change="$descriptionChange" :ishljs="false"  :toolbars="toolbars" @imgAdd="$descriptionImgAdd" @imgDel="$descriptionImgDel"></mavon-editor> 
        </el-form-item>
      </el-tab-pane>
      
      <el-tab-pane label="文章正文" name="2">
        <el-form-item label="正文" >
          
          <mavon-editor ref=cmd v-model="addForm.contentTemplate" @change="$contentChange" :ishljs="false" @imgAdd="$contentImgAdd" @imgDel="$contentImgDel"></mavon-editor>
          
        </el-form-item>
      </el-tab-pane>

      <el-tab-pane label="添加文章" name="3">
        <el-button @click="addArticle">添加文章</el-button>
      </el-tab-pane>
    </el-tabs>
    </el-form>
  </div>
</template>

<script>
import _ from 'loadsh'
import axios from 'axios'

import { addArticle } from '@/network/article'
import { getCategorys } from '@/network/category.js'
import { getTags } from '@/network/tag.js'
import { deleteImage } from '@/network/image.js'


export default {
  data(){
    return {
      addForm:{
        title:'',
        description:'',
        descriptionTemplate:'',
        content:'',
        contentTemplate:'',
        category:'',
        tag:[]
      },
    	addFormRules: {},
      activeIndex: 0,
      Tags:[],
      categoryData:[],
      // mavon-editor配置项
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    }
  },
  methods:{
    //获取分类
    async getCategorys(){
      
      const res =  await getCategorys(this.queryInfo)
      console.log(res)
      this.categoryData = res.data
      
      console.log(this.categoryData)
      
    },
    //获取标签
    async getTags(){
      // console.log(1)
      const res =  await getTags()
      console.log(res)
      this.Tags = res.data
      // this.total = res.data.totalpage
      // console.log(this.tagData)
      // console.log(this.total)
    },
    async addArticle(){
      const form = _.cloneDeep(this.addForm)
      form.tag = form.tag.join(',')
      const res =  await addArticle(form)
      console.log(form)
      console.log(res)
      if(res.meta.status !== 200){
        return this.$message.error(res.meta.msg);
      }
      this.$router.push("/admin")
      
      return this.$message.success(res.meta.msg)
    },
    // 绑定@imgAdd event
    $descriptionImgAdd(pos, $file){
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('upload', $file);
      console.log($file)
      axios({
          url: 'http://127.0.0.1:2020/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
      }).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        console.log(url)
        this.$refs.dmd.$img2Url(pos, url.data.url);
      })
    },
    // 绑定@imgDel event
    async $descriptionImgDel(pos){
      console.log(pos[0])
      const res =  await deleteImage(pos[0])
      console.log(res)
    },
    // 绑定@imgAdd event
    $contentImgAdd(pos, $file){
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('upload', $file);
      console.log($file)
      axios({
          url: 'http://127.0.0.1:2020/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
      }).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        console.log(url)
        this.$refs.cmd.$img2Url(pos, url.data.url);
      })
    },
    // 绑定@imgDel event
    async $contentImgDel(pos){
      console.log(pos[0])
      const res =  await deleteImage(pos[0])
      console.log(res)
    },
    // 绑定@change event
    $descriptionChange(value,render){
      this.addForm.description = render
      console.log(value,render)
    },
    // 绑定@change event
    $contentChange(value,render){
      this.addForm.content = render
      console.log(value,render)
    }
  },
  created(){
    this.getCategorys()
    this.getTags()
  },
  computed: {
  }
}
</script>

<style scoped>

</style>