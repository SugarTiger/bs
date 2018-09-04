<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
import E from "wangeditor";
import {imgServer} from '../../../libs/globeConfig';
export default {
  name: "editor",
  data() {
    return {
      editorContent: ""
    };
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.customConfig.uploadImgServer = "http://127.0.0.1:3000/upload"; // 配置服务器端地址
    editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        for(let url of result.data){
            insertImg(imgServer+url);
        }
      }
    };
    editor.create();
  }
};
</script>

<style scoped>

</style>