<template>
    <div id="proList">
        <h1 class="title">商品列表：</h1>
        <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出商品列表</Button>
        <Row :style="{marginTop:'10px'}">
            <Input v-model="searchConName" @on-change="handleSearch" placeholder="请输入关键字搜索..." style="width: 200px" />
            <Button @click="handleCancel" type="ghost" >重置</Button>
        </Row>
        <Row :style="{marginTop:'10px'}">
            <Table :loading="loading" ref="table" :border="true" :columns="proColumns" :data="proList" width="100%"></Table>
        </Row>
    </div>
</template>
<style lang="less" scoped>
#proList .ivu-table-cell {
  padding: 0;
}
</style>

<script>
import { imgServer } from "../../libs/globeConfig";
import {search} from "../../libs/tool";
export default {
  name: "proList",
  data() {
    return {
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