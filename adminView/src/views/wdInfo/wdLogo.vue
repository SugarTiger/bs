<template>
  <div id="wdInfo">
    <Row type="flex" justify="center" align="middle">
      <Col span="8">
        <Card style="width:320px" class="wdLogoBox">
          <div style="text-align:center">
            <img :src="imgServer+wdLogo">
            <h3>微动鞋子商城Logo</h3>
            <Upload
              :format="['jpg','jpeg','png']"
              :headers="headers"
              :on-success="uploadSuccess"
              action="//127.0.0.1:3000/upload"
            >
              <Button type="ghost" icon="ios-cloud-upload-outline">修改Logo</Button>
            </Upload>
          </div>
        </Card>
      </Col>
    </Row>
    <Row :style="{marginTop: '20px',height:'150px'}" type="flex" align="middle">
      <Col span="2">
        <h2>轮播图列表</h2>
      </Col>
      <Col span="4">
        <Upload :headers="headers" :on-success="addBanner" action="//127.0.0.1:3000/upload">
          <Button type="primary" icon="ios-cloud-upload-outline">添加轮播图</Button>
        </Upload>
      </Col>
    </Row>
    <Row>
      <!-- 轮播图数据 start -->
      <!-- <Table :border="true" :columns="bannerColumns" :data="bannerList"></Table> -->
      <Row type="flex" justify="center" align="middle" class="headerBox">
        <Col span="1">
          <h3>序号</h3>
        </Col>
        <Col span="9">
          <h3>预览</h3>
        </Col>
        <Col span="7">
          <h3>URL地址</h3>
        </Col>
        <Col span="2">
          <h3>对应商品ID</h3>
        </Col>
        <Col span="5">
          <h3>操作</h3>
        </Col>
      </Row>
      <Row
        type="flex"
        justify="center"
        align="middle"
        class="dataBox"
        v-for="(item,i) in bannerList"
      >
        <Col span="1">{{1+i}}</Col>
        <Col span="9">
          <img :src="imgServer+item.img" alt class="bannerImg">
        </Col>
        <Col span="7">{{item.url}}</Col>
        <Col span="2">{{item.goodsId}}</Col>
        <Col span="5">
          <div class="action">
            <Button type="primary" @click="showImg(item.url)">查看</Button>
            <Upload
              :headers="headers"
              :onSuccess="updateBanner"
              action="//127.0.0.1:3000/upload"
              :format="['jpg', 'jpeg', 'png']"
              :style="{height: '32px',marginTop: '5px'}"
            >
              <Button type="info" @click="bannerImgIndex = i">更换图片</Button>
            </Upload>
            <Button :style="{marginTop: '5px'}" @click="changeBannerId(item,i)">修改对应ID</Button>
            <Button :style="{marginTop: '5px'}" type="error" @click="delBanner(item)">删除</Button>
          </div>
        </Col>
      </Row>
      <!-- 轮播图数据 start -->
    </Row>
    <h2 :style="{marginTop: '20px'}">轮播图播放间隙（单位：秒）</h2>
    <Button type="primary" @click="updateTime">提交修改</Button>
    <InputNumber :max="10" :min="1" v-model="bannerTiem"></InputNumber>
    <Row>
      <Col span="16">
        <Form label-position="top">
          <h2>微动商城底部信息：</h2>
          <FormItem label>
            <Input v-model="footer" disabled></Input>
          </FormItem>
          <Button type="primary" @click="updateFooter">更新底部信息</Button>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<style lang="less" scoped>
.wdLogoBox {
  img {
    display: block;
    width: 100px;
    margin: 0 auto;
  }
  h3 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
.dataBox {
  height: 150px;
}
.bannerImg {
  display: block;
  width: 90%;
}
</style>

<script>
import { imgServer } from "../../libs/globeConfig";
export default {
  name: "wdLogo",
  data() {
    return {
      imgServer: imgServer,
      bannerTiem: 1,
      bannerList: [],
      wdLogo: "",
      footer: "",
      headers: {
        Authorization: "Bearer " + this.$store.state.user.token
      },
      bannerColumns: [
        {
          title: "序号",
          key: "index",
          type: "index",
          width: 100,
          align: "center"
        },
        {
          title: "预览",
          key: "img",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: imgServer + params.row.img
              },
              style: {
                display: "block",
                width: "385px"
              }
            });
          }
        },
        {
          title: "url地址",
          key: "url"
        },
        {
          title: "对应商品id",
          key: "goodsId"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            console.log("params", params);
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "column"
                }
              },
              [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary"
                    },
                    style: {
                      marginTop: "10px"
                    },
                    on: {
                      click: () => {
                        this.showImg(params.row.url);
                      }
                    }
                  },
                  "查看"
                ),
                h(
                  "Upload",
                  {
                    props: {
                      headers: this.headers,
                      onSuccess: this.updateBanner,
                      action: "//127.0.0.1:3000/upload",
                      format: ["jpg", "jpeg", "png"]
                    },
                    style: {
                      height: "32px",
                      marginTop: "10px"
                    }
                  },
                  [
                    h(
                      "Button",
                      {
                        props: {
                          type: "info"
                        },
                        style: {
                          // margin: "20px 0"
                        },
                        on: {
                          click: () => {
                            this.bannerImgIndex = params.index;
                          }
                        }
                      },
                      "更换图片"
                    )
                  ]
                ),
                h(
                  "Button",
                  {
                    style: {
                      marginTop: "10px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          render: h => {
                            return h("Input", {
                              props: {
                                value: params.row.goodsId,
                                autofocus: true,
                                placeholder: "请输入对应的商品ID"
                              },
                              on: {
                                input: val => {
                                  params.row.goodsId = val;
                                }
                              }
                            });
                          },
                          onOk: () => {
                            console.log(
                              params.index,
                              params.row.goodsId,
                              this.banner_goods_id
                            );
                            this.banner_goods_id.splice(
                              params.index,
                              1,
                              params.row.goodsId
                            );
                            this.updateWdInfo({
                              banner_goods_id: this.banner_goods_id.join(",")
                            });
                          }
                        });
                      }
                    }
                  },
                  "修改对应ID"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error"
                    },
                    style: {
                      margin: "10px 0"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "提示",
                          content: "确定删除轮播图？",
                          onOk: () => {
                            this.delBanner(params.index);
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]
            );
          }
        }
      ]
    };
  },
  mounted() {
    this.getWdInfo();
  },
  methods: {
    delBannerConfirm(index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除轮播图？",
        onOk: () => {
          this.delBanner(index);
        }
      });
    },
    changeBannerId(bannerInfo, index) {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: bannerInfo.goodsId,
              autofocus: true,
              placeholder: "请输入对应的商品ID"
            },
            on: {
              input: val => {
                bannerInfo.goodsId = val;
              }
            }
          });
        },
        onOk: () => {
          console.log(index, bannerInfo.goodsId, this.banner_goods_id);
          this.banner_goods_id.splice(index, 1, bannerInfo.goodsId);
          this.updateWdInfo({
            banner_goods_id: this.banner_goods_id.join(",")
          });
        }
      });
    },
    getWdInfo() {
      this.bannerList = [];
      this.axios.get("/public/getWdInfo").then(res => {
        this.wdLogo = res.data.info_logo;
        this.footer = res.data.info_footer;
        this.bannerTiem = res.data.info_banner_time;
        this.tempBannerList = res.data.info_banner;
        this.banner_goods_id = res.data.banner_goods_id;
        // 轮播图
        for (var i = 0; i < res.data.info_banner.length; i++) {
          console.log(res.data.info_banner[i], res.data.banner_goods_id[i]);
          this.bannerList.push({
            img: res.data.info_banner[i],
            url: res.data.info_banner[i],
            goodsId: res.data.banner_goods_id[i]
          });
        }
      });
    },
    uploadSuccess(data) {
      this.updateWdInfo({
        info_logo: data.data[0]
      });
    },
    showImg(imgurl) {
      this.$Modal.info({
        render: h => {
          return h("img", {
            attrs: {
              src: imgServer + imgurl
            },
            style: {
              display: "block",
              width: "862px"
            }
          });
        },
        width: "900px"
      });
    },
    updateFooter() {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              autofocus: true,
              placeholder: "请输入新的底部信息",
              value: this.footer
            },
            on: {
              input: val => {
                this.footer = val;
              }
            }
          });
        },
        onOk: val => {
          this.updateWdInfo({
            info_footer: this.footer
          });
        }
      });
    },
    updateWdInfo(newInfo) {
      for (let key in newInfo) {
        if (newInfo[key] == undefined || newInfo[key] === "") {
          delete ctx.request.body[key];
        }
      }
      this.axios.post("/updateWdInfo", newInfo).then(res => {
        if (res.status === 1) {
          this.getWdInfo();
          this.$Message.success("更新成功");
        }
      });
    },
    updateTime() {
      this.updateWdInfo({
        info_banner_time: this.bannerTiem
      });
    },
    addBanner(data) {
      this.tempBannerList.push(data.data[0]);
      this.updateWdInfo({
        info_banner: this.tempBannerList.join(",")
      });
    },
    updateBanner(data) {
      console.log(data, "data");
      this.tempBannerList.splice(this.bannerImgIndex, 1, data.data[0]);
      this.updateWdInfo({
        info_banner: this.tempBannerList.join(",")
      });
    },
    updateBannerGoodsId() {},
    delBanner(index) {
      this.tempBannerList.splice(index, 1);
      this.updateWdInfo({
        info_banner: this.tempBannerList.join(",")
      });
    }
  }
};
</script>