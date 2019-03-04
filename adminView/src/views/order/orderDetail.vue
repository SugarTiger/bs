<template>
    <div id="orderDetail">
        <h2 class="title">订单基本信息</h2>
        <h3 class="olabel">订单编号：{{orderInfo.order_id}}</h3>
        <h3 class="olabel">订单状态：</h3>
            <Steps :current="orderInfo.order_status-1" size="small">
                <Step title="待付款"></Step>
                <Step title="待发货"></Step>
                <Step title="待收货"></Step>
                <Step title="待评论"></Step>
                <Step title="已完成"></Step>
            </Steps>
                <h3 class="olabel">订单总价：{{orderInfo.order_total_price}} 元</h3>
                <h3 class="olabel">收货地址：{{orderInfo.address}}</h3>
                <h3 class="olabel">收货人：{{orderInfo.receiver}}</h3>
                <h3 class="olabel">收件人手机：{{orderInfo.phone}}</h3>
                <h3 class="olabel">订单备注：{{orderInfo.order_note}}</h3>
                <h3 class="olabel">订单创建时间：{{orderInfo.order_create_time}}</h3>
                <h3 class="olabel"  v-if="orderInfo.order_status!==1">订单支付时间：{{orderInfo.order_pay_time}}</h3>
                <h3 class="olabel">订单运费：{{orderInfo.order_pay_time||0}} 元</h3>
                <h3 class="olabel">订单配送方式：{{orderInfo.order_distribution|distributionType}}</h3>
                <h3 class="olabel">订单处理人：{{orderInfo.order_pay_time||"无"}}</h3>
            <h2 class="title" v-if="orderInfo.order_status===2&&orderInfo.order_pay_time!=1">订单操作</h2>
            <Button type="primary" @click="sendOrder" v-if="orderInfo.order_status===2&&orderInfo.order_pay_time!=1">订单发货</Button>
        <h2 class="title">订单商品</h2>
        <Row :style="{marginTop:'10px'}">
            <Input v-model="searchConName" @on-change="handleSearch" placeholder="请输入关键字搜索..." style="width: 200px" />
            <Button @click="handleCancel" type="ghost" >重置</Button>
        </Row>
        <Row :style="{marginTop:'10px'}">
            <!-- <Table :loading="loading" ref="table" :border="true" :columns="proColumns" :data="proList"></Table> -->
            <Row type="flex" justify="center" align="middle" class="headerBox">
              <Col span="2">
                <h3>商品ID</h3>
              </Col>
              <Col span="5">
                <h3>商品名称</h3>
              </Col>
              <Col span="5">
                <h3>商品图片</h3>
              </Col>
              <Col span="2">
                <h3>价格</h3>
              </Col>
              <Col span="2">
                <h3>商品类目</h3>
              </Col>
              <Col span="2">
                <h3>商品颜色</h3>
              </Col>
              <Col span="2">
                <h3>商品尺码</h3>
              </Col>
              <Col span="2">
                <h3>数量</h3>
              </Col>
              <Col span="2">
                <h3>商品积分</h3>
              </Col>
            </Row>
            <Row
              type="flex"
              justify="center"
              align="middle"
              class="dataBox"
              v-for="(item,i) in proList"
            >
              <Col span="2">
                {{item.goods_id}}
              </Col>
              <Col span="5">
                {{item.goods_name}}
              </Col>
              <Col span="5">
                <img :src="imgServer+item.goods_img[0]"/>
              </Col>
              <Col span="2">
                {{item.goods_price}}
              </Col>
              <Col span="2">
                {{item.goods_type}}
              </Col>
              <Col span="2">
                {{item.goods_color}}
              </Col>
              <Col span="2">
                {{item.goods_capacity}}
              </Col>
              <Col span="2">
                {{item.goods_quantity}}
              </Col>
              <Col span="2">
                {{item.goods_integral}}
              </Col>
            </Row>
        </Row>

        <Modal v-model="modal1" title="填写发货信息" @on-ok="send">
                <h4 :style="{marginTop:'10px'}">物流公司：</h4>
                <Dropdown :style="{marginTop:'10px'}" @on-click="seletWl">
                    <a href="javascript:void(0)">
                        {{wlTitle}}
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="(item,i) of wlList" :name="item.com  +'-'+item.no">{{item.com}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <h4 :style="{marginTop:'10px'}">物流编号：</h4>
                <Input  :style="{marginTop:'10px'}" v-model="wlNum" placeholder="物流编号"></Input>
        </Modal>
    </div>
</template>

<script>
import { imgServer } from "../../libs/globeConfig";
import { search } from "../../libs/tool";
export default {
  name: "orderDetail",
  data() {
    return {
      imgServer,
      modal1: false,
      wlList: [
        {
          com: "顺丰",
          no: "sf"
        },
        {
          com: "申通",
          no: "sto"
        },
        {
          com: "圆通",
          no: "yt"
        },
        {
          com: "韵达",
          no: "yd"
        },
        {
          com: "天天",
          no: "tt"
        },
        {
          com: "EMS",
          no: "ems"
        },
        {
          com: "中通",
          no: "zto"
        },
        {
          com: "汇通",
          no: "ht"
        },
        {
          com: "全峰",
          no: "qf"
        },
        {
          com: "德邦",
          no: "db"
        },
        {
          com: "国通",
          no: "gt"
        },
        {
          com: "如风达",
          no: "rfd"
        },
        {
          com: "京东快递",
          no: "jd"
        },
        {
          com: "宅急送",
          no: "zjs"
        },
        {
          com: "EMS国际",
          no: "emsg"
        },
        {
          com: "Fedex国际",
          no: "fedex"
        },
        {
          com: "邮政国内（挂号信）",
          no: "yzgn"
        },
        {
          com: "UPS国际快递",
          no: "ups"
        },
        {
          com: "中铁快运",
          no: "ztky"
        },
        {
          com: "佳吉快运",
          no: "jiaji"
        },
        {
          com: "速尔快递",
          no: "suer"
        },
        {
          com: "信丰物流",
          no: "xfwl"
        },
        {
          com: "优速快递",
          no: "yousu"
        },
        {
          com: "中邮物流",
          no: "zhongyou"
        },
        {
          com: "天地华宇",
          no: "tdhy"
        },
        {
          com: "安信达快递",
          no: "axd"
        },
        {
          com: "快捷速递",
          no: "kuaijie"
        }
      ],
      wlTitle: "选择物流公司",
      wlNum: "",
      wlCode: "",
      orderInfo: { order_status: 1 },
      loading: true,
      sendLoading:true,
      // proColumns: [
      //   {
      //     title: "商品ID",
      //     key: "goods_id",
      //     width: 50,
      //     align: "center"
      //   },
      //   {
      //     title: "商品名称",
      //     key: "goods_name",
      //     align: "center",
      //     width: 200
      //   },
      //   {
      //     title: "商品图片",
      //     key: "goods_img",
      //     align: "center",
      //     width: "136px",
      //     render: (h, params) => {
      //       return h("img", {
      //         attrs: {
      //           src: imgServer + params.row.goods_img[0]
      //         },
      //         style: {
      //           display: "block",
      //           width: "100px",
      //           maxHeight: "100px"
      //         }
      //       });
      //     }
      //   },
      //   {
      //     title: "价格",
      //     key: "goods_price",
      //     align: "center"
      //   },
      //   {
      //     title: "商品类目",
      //     key: "goods_type",
      //     align: "center"
      //   },
      //   {
      //     title: "商品颜色",
      //     key: "goods_color",
      //     align: "center"
      //   },
      //   {
      //     title: "商品尺码",
      //     key: "goods_capacity",
      //     align: "center"
      //   },
      //   {
      //     title: "数量",
      //     key: "goods_quantity",
      //     align: "center"
      //   },
      //   {
      //     title: "商品积分",
      //     key: "goods_integral",
      //     align: "center"
      //   }
      // ],
      proList: [],
      searchConName: "",
      tempList: []
    };
  },
  methods: {
    getOrderInfo(orderId, userId) {
      this.axios
        .get("/getOrderDetail", {
          params: {
            orderId,
            userId
          }
        })
        .then(res => {
          if (res.status === 1) {
            this.orderInfo = res.data;
            this.proList = res.data.proList;
            this.tempList = res.data.proList;
            this.loading = false;
          }
        });
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
    sendOrder() {
      this.modal1 = true;
    },
    //发货
    send() {
      if (this.wlNum === "") {
        this.$Message.warning("请填写物流订单号！");
        return;
      } else if (this.wlCode === "") {
        this.$Message.warning("请选择快递公司！");
        return;
      }
      this.axios.post('/updateOrder',{
        orderId:this.orderInfo.order_id,
        newStatus:3,
        wlNum:this.wlNum,
        kd_gs:this.wlTitle
      }).then(res=>{
        if(res.status===1){
          this.$Message.success(`订单 : ${this.orderInfo.order_id}发货成功！`);
          this.modal1 = false;
          this.$router.push({name:'orderList'})
        }
      })
      // 查询快递的 API接口
      // this.axios.get('http://v.juhe.cn/exp/index',{
      //   params:{
      //     com:this.wlCode,
      //     no:this.wlNum,
      //     key:"e63c8ef7b55e984ac78f1b1589abeaa6"
      //   }
      // }).then(res=>{
      //   console.log(res)
      // })
    },
    seletWl(wl) {
      var tmp = wl.split("-");
      this.wlTitle = tmp[0];
      this.wlCode = tmp[1];

    }
  },
  mounted() {
    var orderId = this.$route.query.orderId;
    var userId = this.$route.query.userId;
    if (!orderId || !userId) {
      this.$router.go(-1);
      return;
    }
    this.getOrderInfo(orderId, userId);
    document.querySelector(".single-page-con").style.backgroundColor = "#fff";
  },
  filters: {
    distributionType(val) {
      return val == 0 ? "快递" : "到店自提";
    }
  }
};
</script>
<style lang="less" scoped>
.olabel {
  margin-top: 5px;
}
.dataBox{
  /deep/.ivu-col img{
    display: block;
    width: 100px;
    maxHeight: 100px;
  }
}
</style>
