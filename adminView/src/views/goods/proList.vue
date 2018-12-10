<template>
    <div id="proList">
        <h1 class="title">商品列表：</h1>
        <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出商品列表</Button>
        <Row :style="{marginTop:'10px'}">
            <Input v-model="searchConName" @on-change="handleSearch" placeholder="请输入关键字搜索..." style="width: 200px" />
            <Button @click="handleCancel" type="ghost" >重置</Button>
        </Row>
        <!-- <Row :style="{marginTop:'10px'}">
            <Table :loading="loading" ref="table" :border="true" :columns="proColumns" :data="proList" width="100%"></Table>
        </Row> -->
        <Row :style="{marginTop:'10px'}" class="headerBox" type="flex" justify="center" align="middle">
          <Col span="1"><h3>ID</h3></Col>
          <Col span="3"><h3>名称</h3></Col>
          <Col span="3"><h3>图片</h3></Col>
          <Col span="2"><h3>市场价格</h3></Col>
          <Col span="2"><h3>本店价格</h3></Col>
          <Col span="2"><h3>库存量</h3></Col>
          <Col span="2"><h3>在售状态</h3></Col>
          <Col span="2"><h3>类目</h3></Col>
          <Col span="1"><h3>颜色</h3></Col>
          <Col span="1"><h3>尺码</h3></Col>
          <Col span="2"><h3>销售量</h3></Col>
          <Col span="1"><h3>积分</h3></Col>
          <Col span="2"><h3>操作</h3></Col>
        </Row>
        <Row class="dataBox" type="flex" justify="center" align="middle" v-for="(item,i) in proList">
          <Col span="1">{{item.proId}}</Col>
          <Col span="3">{{item.proName}}</Col>
          <Col span="3">
            <img :src="imgServer+item.img" alt="" class="proImg">
          </Col>
          <Col span="2">{{item.marketPrice}}</Col>
          <Col span="2">{{item.price}}</Col>
          <Col span="2">{{item.inventory}}</Col>
          <Col span="2" :class="{active:item.status==='在售'}">{{item.status}}</Col>
          <Col span="2">{{item.type}}</Col>
          <Col span="1">{{item.color}}</Col>
          <Col span="1">{{item.capacity}}</Col>
          <Col span="2">{{item.sales}}</Col>
          <Col span="1">{{item.integral}}</Col>
          <Col span="2">
            <div class="action">
               <Button type="primary" size="small" @click="toUpdatePro(item.proId)">编辑商品</Button>
               <Button :style="{marginTop:'10px'}" size="small" :type="item.status==='在售'?'warning':'info'" @click="changeStatus(item)">{{item.status==='在售'?'下架商品':'上架商品'}}</Button>
            </div>
          </Col>
        </Row>
    </div>
</template>
<style lang="less" scoped>
#proList .ivu-table-cell {
  padding: 0;
}
// .headerBox{
//   height: 45px;
//   border:1px solid #e5e5e5;
//   background-color: #f8f8f9;
//   h3{
//     text-align: center;
//     border-right:1px solid #e5e5e5;
//     line-height: 45px;
//     height: 45px;
//     font-size: 14px;
//     color: #333;
//   }
//   /deep/.ivu-col:last-of-type{
//     h3{
//       border-right:none
//     }
//   }
// }
// .dataBox{
//   border-bottom:1px solid #e5e5e5;
//   border-left:1px solid #e5e5e5;
//   border-right:1px solid #e5e5e5;
//   padding: 10px 0;
//   background-color: #fff;
//   height: 100px;
//   .proImg{
//     width: 100px;
//     max-height:100px;
//   }
//   .action{
//   width: 100%;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   .ivu-btn +.ivu-btn{
//     margin-top: 10px;
//   }
// }
// /deep/.ivu-col{
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100px;
//   border-right: 1px solid #e5e5e5;
// }
// /deep/.ivu-col:last-of-type{
//   border-right: none;
// }
// }
</style>

<script>
import { imgServer } from "../../libs/globeConfig";
import {search} from "../../libs/tool";
export default {
  name: "proList",
  data() {
    return {
      imgServer,
      loading: true,
      proColumns: [
        {
          title: "商品ID",
          key: "proId",
          width: 50,
          align: "center"
        },
        {
          title: "商品名称",
          key: "proName",
          align: "center",
          width: 200
        },
        {
          title: "商品图片",
          key: "img",
          align: "center",
          width: "136px",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: imgServer + params.row.img
              },
              style: {
                display: "block",
                width: "100px",
                maxHeight: "100px"
              }
            });
          }
        },
        {
          title: "市场价格",
          key: "marketPrice",
          align: "center"
        },
        {
          title: "本店价格",
          key: "price",
          align: "center"
        },
        {
          title: "库存量",
          key: "inventory",
          align: "center"
        },
        {
          title: "在售状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            return h(
              "p",
              {
                style: {
                  color: params.row.status == "在售" ? "#080" : "#bd0007"
                }
              },
              params.row.status
            );
          },
          filters: [
            {
              label: "在售",
              value: "在售"
            },
            {
              label: "已下架",
              value: "已下架"
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.status === value;
          }
        },
        {
          title: "商品类目",
          key: "type",
          align: "center"
        },
        {
          title: "商品颜色",
          key: "color",
          align: "center"
        },
        {
          title: "商品尺码",
          key: "capacity",
          align: "center"
        },
        {
          title: "商品销售量",
          key: "sales",
          align: "center"
        },
        {
          title: "商品积分",
          key: "integral",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: "90px",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px"
                }
              },
              [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "updatePro",
                          query: {
                            proId: params.row.proId
                          }
                        });
                      }
                    }
                  },
                  "编辑商品"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: params.row.status == "在售" ? "warning" : "info"
                    },
                    style: {
                      marginTop: "10px"
                    },
                    on: {
                      click: () => {
                        this.changeStatus(params.row);
                      }
                    }
                  },
                  params.row.status == "在售" ? "下架商品" : "上架商品"
                )
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "error"
                //     },
                //     style: {
                //           marginTop: "10px"
                //     },
                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           title: "提示",
                //           content: "确定删除商品？",
                //           onOk: () => {
                //             this.delPro(params.row.proId)
                //           }
                //         });
                //       }
                //     }
                //   },
                //   "删除商品"
                // )
              ]
            );
          }
        }
      ],
      proList: [],
      searchConName: "",
      tempList: []
    };
  },
  mounted() {
    this.getProList();
  },
  methods: {
    toUpdatePro(proId){
      this.$router.push({name:'updatePro',query:{
                 proId:proId
               }});
    },
    handleCancel() {
      this.searchConName = "";
      this.proList = this.tempList;
    },
    handleSearch() {
      this.proList = this.tempList;
      if (this.searchConName === "") return;
      this.proList = search(this.proList, this.searchConName);
    },
    exportData() {
      console.log("导出商品列表");
      this.$refs.table.exportCsv({
        filename: "商品列表"
      });
    },
    getProList() {
      this.proList = [];
      this.axios.get("/public/getProList").then(res => {
        for (let item of res.data.list) {
          this.proList.push({
            proId: item.goods_id,
            proName: item.goods_name,
            img: item.goods_img[0],
            marketPrice: item.goods_marketPrice,
            price: item.goods_price,
            type: item.goods_type,
            status: item.goods_status == 1 ? "在售" : "已下架",
            color: item.goods_color,
            capacity: item.goods_id,
            sales: item.goods_sales,
            integral: item.goods_integral,
            inventory: item.goods_inventory
          });
        }
        this.tempList = this.proList;
        this.loading = false;
      });
    },
    delPro(proId) {
      console.log({
        proId
      });
      this.axios
        .post("/delPro", {
          proId
        })
        .then(res => {
          if (res.status === 1) {
            this.$Message.success("删除成功");
            this.getProList();
          }
        });
    },
    changeStatus(proInfo) {
      console.log("proInfo", proInfo);
      this.axios
        .post("/updateProInfo", {
          proId: proInfo.proId,
          goods_status: proInfo.status === "在售" ? 0 : 1
        })
        .then(res => {
          if (res.status === 1) {
            this.$Message.success("操作成功");
            this.getProList();
          }
        });
    }
  }
};
</script>