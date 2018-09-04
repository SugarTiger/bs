<template>
    <div>
        <h1 class="title">添加管理员</h1>
        <Row>
                <Form collapsible :collapsed-width="300" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                    <FormItem label="管理员登陆名" prop="admin_name">
                      <Row>
                        <Col span="10">
                            <Input v-model="formValidate.admin_name" placeholder="管理员登陆名"></Input>
                        </Col>
                      </Row>
                        
                    </FormItem>
                    <FormItem label="管理员头像" prop="admin_header" id="admin_header">
                        <!-- 上传图片 -->
                        <div class="demo-upload-list" v-for="item in uploadList">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            action="//127.0.0.1:3000/upload"
                            :headers="headers"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="View Image" v-model="visible">
                            <img :src="imgName" v-if="visible" style="width: 100%">
                        </Modal>
                        <!-- 上传图片 -->
                    </FormItem>
                    <FormItem label="管理员等级" prop="admin_type">
                        <RadioGroup v-model="formValidate.admin_type" type="button">
                            <Radio :label="0" >普通管理员</Radio>
                            <Radio :label="1" >超级管理员</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="管理员登陆密码" prop="admin_pwd">
                        <Row>
                            <Col span="6">
                                <Input type="password" v-model="formValidate.admin_pwd" placeholder="管理员登陆密码"></Input>
                            </Col>
                            <Col span="3">
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="确认密码" prop="admin_re_pwd">
                        <Row>
                            <Col span="6">
                                <Input type="password" v-model="formValidate.admin_re_pwd" placeholder="管理员登陆密码"></Input>
                            </Col>
                            <Col span="3">
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Form>
        </Row>
    </div>
</template>

<script>
import { imgServer } from "../../libs/globeConfig";
import md5 from 'md5';
export default {
  data() {
    return {
      headers: {
        Authorization: "Bearer " + this.$store.state.user.token
      },
      imgName: "",
      visible: false,
      uploadList: [],
      formValidate: {
        admin_name: "",
        admin_type: 0,
        admin_pwd:"",
        admin_re_pwd:"",
        admin_header:""
      },
      ruleValidate: {
        admin_name: [
          {
            required: true,
            message: "管理员登录名不能为空",
            trigger: "blur"
          }
        ],
        admin_pwd: [
          {
            required: true,
            message: "管理员登陆密码不能为空",
            trigger: "blur"
          }
        ],
        admin_re_pwd: [
          {
            required: true,
            message: " 确认密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 怎加图片
          if(this.uploadList.length===0){
            this.$Message.error("请上传管理员头像图片");
            return;
          }
          //验证密码
          if(this.formValidate.admin_pwd!==this.formValidate.admin_re_pwd){
              this.$Message.error("两次密码不一致");
              this.formValidate.admin_re_pwd = "";
              return;
          }
          this.formValidate.admin_header = this.uploadList[0].response.data[0]
          var adminInfo = {}
          Object.assign(adminInfo,this.formValidate)
          delete adminInfo.admin_re_pwd
          adminInfo.admin_pwd = md5(this.formValidate.admin_pwd)
          // 添加管理员
          this.axios.post('/addAdmin',adminInfo).then(res=>{
            if(res.status==1){
              this.$Message.success("提交成功");
              this.$router.push({name: "adminList"})
            }
          })
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.editor.txt.clear()// 清空商品详情
      this.uploadList = [] //清空图片上传列表
    },
    // 上传图片的代码
    handleView(name) {
      this.imgName = name;
      console.log(name);
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url = imgServer + res.data[0];
      file.name = "img";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "请选择jpg、png、jpeg格式文件."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: "上传文件大小不能超过2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传1张照片."
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>