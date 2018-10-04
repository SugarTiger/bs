<template>
    <div>
        <h1 class="title">编辑商品</h1>
        <Row>
                <Form collapsible :collapsed-width="300" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem label="商品名称" prop="goods_name">
                      <Row>
                        <Col span="10">
                            <Input v-model="formValidate.goods_name" placeholder="商品名称"></Input>
                        </Col>
                      </Row>
                        
                    </FormItem>
                    <FormItem label="商品图片" prop="proImg" id="proImg">
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
                            :default-file-list="defaultList"
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
                    <FormItem label="商品市场价" prop="goods_marketPrice">
                        <Row>
                            <Col span="6">
                                <Input v-model="formValidate.goods_marketPrice" placeholder="商品市场价"></Input>
                            </Col>
                            <Col span="3">
                            （元）
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="本店价格" prop="goods_price">
                        <Row>
                            <Col span="6">
                                <Input v-model="formValidate.goods_price" placeholder="本店价格"></Input>
                            </Col>
                            <Col span="3">
                            （元）
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="商品状态">
                        <i-switch v-model="formValidate.goods_status" size="large">
                            <span slot="open">上架</span>
                            <span slot="close">下架</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="商品类目" prop="goods_type">
                        <RadioGroup v-model="formValidate.goods_type">
                            <Radio label="亚瑟士"></Radio>
                            <Radio label="阿迪达斯"></Radio>
                            <Radio label="耐克"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="商品库存" prop="goods_inventory">
                      <Row>
                        <Col span="8">
                          <InputNumber v-model="formValidate.goods_inventory" placeholder="商品库存"></InputNumber>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem label="商品颜色" prop="goods_color">
                      <Row>
                        <Col span="8">
                            <Input v-model="formValidate.goods_color" placeholder="商品颜色"></Input>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem label="商品容量" prop="goods_capacity">
                        <Row>
                            <Col span="6">
                                <Input v-model="formValidate.goods_capacity" placeholder="商品容量"></Input>
                            </Col>
                            <Col span="5">
                            （L:升）
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="商品积分" prop="goods_integral">
                      <Row>
                          <Col span="6">
                            <Input v-model="formValidate.goods_integral" placeholder="商品积分,默认为0"></Input>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem label="商品详情" prop="goods_details">
                      <div ref="editor" style="text-align:left;width:90%;"></div>
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
import E from "wangeditor";
export default {
  data() {
    return {
      headers: {
        Authorization: "Bearer " + this.$store.state.user.token
      },
      imgName: "",
      visible: false,
      uploadList: [],
      defaultList: [],
      formValidate: {
        goods_name: "",
        goods_marketPrice: "",
        goods_price: "",
        goods_status: true,
        goods_type: "亚瑟士",
        goods_color: "",
        goods_capacity: "",
        goods_integral: "",
        goods_details: "",
        goods_inventory: 1,
        goods_sales: 0
      },
      ruleValidate: {
        goods_name: [
          {
            required: true,
            message: "商品名称不能为空",
            trigger: "blur"
          }
        ],
        goods_type: [
          {
            required: true,
            message: "商品类型不能为空"
          }
        ],
        goods_color: [
          {
            required: true,
            message: "商品颜色不能为空"
          }
        ],
        goods_capacity: [
          {
            required: true,
            message: "商品容量不能为空"
          }
        ],
        goods_details: [
          {
            required: true,
            message: "商品详情不能为空"
          }
        ],
        goods_inventory: [
          {
            required: true,
            message: "商品库存不能为空"
          }
        ]
      },
      proId: ""
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 怎加图片
          if (this.uploadList.length === 0) {
            this.$Message.error("请上传商品图片");
            return;
          }
          var imgList = [];
          for (let img of this.uploadList) {
            if(!!img.yUrl){
              imgList.push(img.yUrl)
            }else{
              imgList.push(img.response.data[0]);
            }
          }
          this.formValidate.goods_img = imgList.join(",");
          var proInfo = {}
          Object.assign(proInfo,this.formValidate)
          proInfo.goods_status=this.formValidate.goods_status ? 1 : 0
          proInfo.proId =proInfo.goods_id
          delete proInfo.goods_id;
          console.log(proInfo)
          // 更新商品
          this.axios.post("/updateProInfo", proInfo).then(res => {
            if (res.status == 1) {
              this.$Message.success("更新成功");
              this.$router.push({ name: "proList" });
            }
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.editor.txt.clear(); // 清空商品详情
      this.uploadList = []; //清空图片上传列表
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
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传5张照片."
        });
      }
      return check;
    },
    getProDetail(proId) {
      this.axios
        .get("/public/getProDetail", {
          params: {
            proId
          }
        })
        .then(res => {
          var proInfo = res.data.items;
          proInfo.goods_status = proInfo.goods_status ? true : false;
          Object.assign(this.formValidate, proInfo);
          var imglist = proInfo.goods_img;
          for (let imgUrl of imglist) {
            this.defaultList.push({
              name: Date.now(),
              url: imgServer + imgUrl,
              yUrl:imgUrl
            });
          }
          this.editor.txt.html(proInfo.goods_details)
          this.$nextTick(()=>{
            this.uploadList = this.$refs.upload.fileList;
          })  //修复upload 上传default-file-list 在mount函数中赋值无效
        });
    }
  },
  mounted() {
    this.proId = this.$route.query.proId;
    if (this.proId === undefined) this.$router.replace({ name: "home_index" });
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = html => {
      this.formValidate.goods_details = html;
    };
    this.editor.customConfig.uploadImgServer = "http://127.0.0.1:3000/upload"; // 配置服务器端地址
    this.editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        for (let url of result.data) {
          insertImg(imgServer + url);
        }
      }
    };
    this.editor.create();
    this.getProDetail(this.proId);
  }
};
</script>