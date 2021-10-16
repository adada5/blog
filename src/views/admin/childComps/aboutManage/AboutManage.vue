<template>
  <div>
    <el-form :model="data" ref="editFormRef" label-position="top">         
      <el-form-item label="修改时间" > 
        {{data.updateTime | dateFormat}}
      </el-form-item>
      <el-form-item label="正文" >  
        <mavon-editor ref=cmd v-model="data.contentTemplate" @change="$contentChange" :ishljs="false" @imgAdd="$contentImgAdd" @imgDel="$contentImgDel"></mavon-editor>
      </el-form-item>
      <el-button @click="editAbout">修改</el-button>
    </el-form>
  </div>
</template>

<script>
import { getAbout,eidtAbout} from '@/network/about'
import { deleteImage } from '@/network/image'
 
export default {
  data(){
    return {
      data:{}
    }
  },
  methods:{
    async getAbout(){
      const res = await getAbout()
      this.data = res.data
      console.log(res)
    },
    async editAbout(){
      const res = await eidtAbout(this.data._id,this.data)
      if(res.meta.status !== 200){
        return this.$message.error(res.meta.msg);
      }
      this.data = res.data
      return this.$message.success(res.meta.msg)

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
    $contentChange(value,render){
      this.data.content = render
      console.log(value,render)
    }
  },
  created(){
    this.getAbout()
  }
}
</script>

<style scoped>

</style>