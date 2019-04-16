<template>
    <div>
        <h1 class="title">订单列表</h1>
        <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出订单列表</Button>
        <Row :style="{marginTop:'10px'}">
            <Input v-model="searchConName" @on-change="handleSearch" placeholder="请输入关键字搜索..." style="width: 200px" />
            <Button @click="handleCancel" type="ghost" >重置</Button>
        </Row>
        <Row :style="{marginTop:'10px'}">
            <!-- <Table ref="table" :loading="loading"  :border="true" :columns="orderColumns" :data="orderList"></Table> -->
            <Row type="flex" justify="center" align="middle" class="headerBox">
              <Col span="2">
                <h3>订单ID</h3>
              </Col>
              <Col span="3">
                <h3>订单生成日期</h3>
              </Col>
              <Col span="2">
                <h3>用户ID</h3>
              </Col>
              <Col span="3">
                <h3>用户名</h3>
              </Col>
              <Col span="3">
                <h3>用户头像</h3>
              </Col>
              <Col span="2">
                <h3>订单状态</h3>
              </Col>
              <Col span="2">
                <h3>订单总价(元)</h3>
              </Col>
              <Col span="2">
                <h3>订单备注</h3>
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
              v-for="(item,i) in orderList"
            >
              <Col span="2">
                {{item.order_id}}
              </Col>
              <Col span="3">
                {{item.order_create_time|dateFormat}}
              </Col>
              <Col span="2">
                {{item.user_id}}
              </Col>
              <Col span="3">
                {{item.user_name}}
              </Col>
              <Col span="3">
                <Avatar size="large" :src="imgServer+item.user_headurl"/>
              </Col>
              <Col span="2">
                {{item.order_status|getOrderStatus}}
              </Col>
              <Col span="2">
                {{item.order_total_price}}
              </Col>
              <Col span="2">
                {{item.order_note||"空"}}
              </Col>
              <Col span="5">
                <div class="action">
                  <Button @click="toOrderDetail(item)" type='info'>订单详情</Button>

                  <Button @click="delOrder(item)" type='error'>删除订单</Button>
                </div>
              </Col>
            </Row>
        </Row>
    </div>
</template>

<script>
import { imgServer } from "../../libs/globeConfig";
import {search} from "../../libs/tool";
export default {
  name: "orderList",
  data() {
    return {
      imgServer,
      loading: true,
      orderList: [],
      // orderColumns: [
      //   {
      //     title: "订单ID",
      //     key: "order_id",
      //     align: "center",
      //     width: "120px"
      //   },
      //   {
      //     title: "订单生成日期",
      //     key: "order_create_time",
      //     align: "center",
      //     width:"150px",
      //     render: (h, params) => {
      //       return h(
      //         "span",
      //         {},
      //         new Date(params.row.order_create_time).Format("yyyy-MM-dd hh:mm:ss")
      //       );
      //     },
      //     sortable: true
      //   },
      //   {
      //     title: "用户ID",
      //     key: "user_id",
      //     align: "center",
      //     width: "80px"
      //   },
      //   {
      //     title: "用户名",
      //     key: "user_name",
      //     align: "center",
      //     width: "100px"
      //   },
      //   {
      //     title: "用户头像",
      //     key: "user_headurl",
      //     align: "center",
      //     width: "136px",
      //     render: (h, params) => {
      //       return h("Avatar", {
      //         props: {
      //           src: imgServer + params.row.user_headurl,
      //           size: "large"
      //         }
      //       });
      //     }
      //   },
      //   {
      //     title: "订单状态",
      //     key: "order_status",
      //     align: "center",
      //     render:(h,params)=>{
      //         return h("span",{},this.getOrderStatus(params.row.order_status))
      //     },
      //     filters: [
      //       {
      //         label: "待支付",
      //         value: 1
      //       },
      //       {
      //         label: "待发货",
      //         value: 2
      //       },
      //       {
      //         label: "待收货",
      //         value: 3
      //       },
      //       {
      //         label: "待评论",
      //         value: 4
      //       },
      //       {
      //         label: "已完成",
      //         value: 5
      //       },
      //       {
      //         label: "已取消",
      //         value: 0
      //       }
      //     ],
      //     filterMultiple: false,
      //     filterMethod(value, row) {
      //       return row.order_status === value;
      //     }
      //   },
      //   {
      //     title: "订单总价(元)",
      //     key: "order_total_price",
      //     align: "center",
      //     sortable: true
      //   },
      //   {
      //     title: "订单备注",
      //     key: "order_note",
      //     align: "center",
      //     width: "270px",
      //     render: (h, params) => {
      //       return h("span", {},params.row.order_note||"空");
      //     }
      //   },
      //   {
      //     title: "操作",
      //     key: "action",
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "div",
      //         {
      //           style: {
      //             display: "flex",
      //             flexDirection: "column",
      //             alignItems: "center",
      //             padding: "10px"
      //           }
      //         },
      //         [
      //           h(
      //             "Button",
      //             {
      //               props: {
      //                 type: "info"
      //               },
      //               style: {
      //                 marginTop: "10px"
      //               },
      //               on: {
      //                 click: () => {
      //                   this.$router.push({
      //                       name:"orderDetail",
      //                       query:{
      //                           orderId:params.row.order_id,
      //                           userId:params.row.user_id
      //                       }
      //                   })
      //                 }
      //               }
      //             },
      //             "查看订单详情"
      //           )
      //         ]
      //       );
      //     }
      //   }
      // ],
      searchConName: "",
      tempList: []
    };
  },
  methods: {
    toOrderDetail(orderInfo){
      this.$router.push({
                            name:"orderDetail",
                            query:{
                                orderId:orderInfo.order_id,
                                userId:orderInfo.user_id
                            }
                        })
    },
    delOrder(orderInfo){
      console.log(orderInfo)
      this.axios
        .post("/delOrder", {
              orderId: orderInfo.order_id,
              userId:orderInfo.user_id
        })
        .then(res => {
          if (res.status === 1) {
            this.$Notice.success({
              title: "商品评论删除成功"
            });
            this.getorderList();
          }
        });
    },
    getOrderList() {
      this.axios.get("/getAllOrderList").then(res => {
        if (res.status === 1) {
          this.orderList = res.data;
          this.tempList = res.data;
          this.loading = false;
        }
      });
    },
    exportData() {
      console.log("导出商品评论表");
      this.$refs.table.exportCsv({
        filename: "商品评论表"
      });
    },
    delComment(commentId) {
      this.axios
        .post("/delProComment", {
          commentId
        })
        .then(res => {
          if (res.status === 1) {
            this.$Notice.success({
              title: "商品评论删除成功"
            });
            this.getorderList();
          }
        });
    },
    handleCancel() {
      this.searchConName = "";
      this.orderList = this.tempList;
    },
    handleSearch() {
      this.orderList = this.tempList;
      if (this.searchConName === "") return;
      this.orderList = search(
        this.orderList,
        this.searchConName
      );
    }
  },
  filters:{
    dateFormat(time){
      return new Date(time).Format("yyyy-MM-dd hh:mm:ss")
    },
    getOrderStatus(orderStatus){
        switch(orderStatus){
            case 1:
                return "待付款"
            case 2:
                return "待发货"
            case 3:
                return "待收货"
            case 4:
                return "待评论"
            case 5:
                return "已完成"
        }
    },
  },
  mounted() {
    this.getOrderList();
  }
};
</script>