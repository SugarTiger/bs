<template>
  <div id="user">
    <topBody/>
    <navTab/>
    <ul class="crumbs">
            <li>
                <router-link to="index">首页</router-link>
            </li>
            <li>
                <router-link to="user">我的微动</router-link>
            </li>
        </ul>
    <div class="containe">

            <div class="sidebar">
                <h2>会员中心</h2>
                <ul>
                    <li>
                        <h3>
                            <router-link to="user">账户信息</router-link>
                        </h3>
                        <ul>
                            <li class="active">
                                <router-link to="user">个人资料</router-link>
                            </li>
                            <li>
                                <router-link to="address">管理收货地址</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3>
                            <router-link to="order">订单中心</router-link>
                        </h3>
                    </li>
                </ul>
            </div>
            <div class="main">
                <div class="user_info">
                    <div class="head">
                        <img :src="imgServer+userInfo.user_headurl" alt="">
                    </div>
                    <div class="info">
                        <h3>{{userInfo.user_name}}</h3>
                        <span>您好！微动欢迎您 ！</span>
                        <p>帐户余额：
                            <span>￥{{userInfo.user_balance}}</span> 帐户状态：
                            <span>正常</span>
                        </p>
                        <div>
                            <a href="javascript:void(0)" class="edit_info">
                                <img src="../assets/images/edit_icon.png" alt="">修改个人资料</a>
                            <router-link to="address" class="edit_addr">
                                <img src="../assets/images/addr_icon.png" alt="">收货地址管理</router-link>
                            <a href="javascript:void(0)" class="verify_email">
                                <img src="../assets/images/email_icon.png" alt="">未验证邮箱</a>
                            <a href="javascript:void(0)" class="verify_phone">
                                <img src="../assets/images/phone_icon.png" alt="">未验证手机</a>
                        </div>
                    </div>
                </div>
                <div class="my_order">
                    <h2>最新订单</h2>
                    <ul class="order_list" v-if="orderList.length!==0">
                        <li>
                            <div class="orderPro">
                                <router-link :to="{name:'order_details',query:{orderId:orderList[0].order_id}}">
                                    <img src="../assets/images/pro3_1_1.png" alt="">
                                </router-link>
                                <div>
                                    <router-link :to="{name:'order_details',query:{orderId:orderList[0].order_id}}">
                                        <p>订单号：
                                            <span>{{orderList[0].order_id}}</span>
                                        </p>
                                        <p>下单时间：
                                            <span>{{orderList[0].order_create_time | formTime}}</span>
                                        </p>
                                    </router-link>
                                    <p>
                                        <img src="../assets/images/7_icon.png" alt="">支持7天无理由退货</p>
                                    <p>
                                        <img src="../assets/images/bao_icon.png" alt="">选廷保</p>
                                </div>
                                <span class="color">收货人：
                                    <span>{{orderList[0].receiver}}</span>
                                </span>
                            </div>
                            <span class="price">订单总价：￥{{orderList[0].order_total_price}}</span>
                            <span class="count">商品数量：{{orderList[0].qty}}</span>
                            <div class="handle">
                                <router-link :to="{name:'order_details',query:{orderId:orderList[0].order_id}}">查看订单详情</router-link>
                                <router-link :to="{name:'pay',query:{orderId:orderList[0].order_id}}" v-if="orderList[0].order_status===1">去付款</router-link>
                                <router-link :to="{name:'comment',query:{proId:orderList[0].proList[0].goods_id,orderId:orderList[0].order_id}}" v-if="orderList[0].order_status===4">去评价</router-link>
                                <span class="del" v-if="orderList[0].order_status===3"  @click="updateOrder(orderList[0].order_id,4)">确认收货</span>
                                <span class="del" style="color:red;" v-if="orderList[0].order_status===1||orderList[0].order_status===2" @click="updateOrder(orderList[0].order_id,0)">取消订单</span>
                            </div>
                            <em>{{orderList[0].order_status|orderStatus}}</em>
                        </li>
                    </ul>
                <h5 style="text-align:center;margin-top: 20px;" v-else>暂无订单！</h5>
                </div>
            </div>
            </div>
        </div>
</template>

<script>
import topBody from "@/components/topBody";
import navTab from "@/components/navTab";
import { imgServer } from "@/utils/config";
export default {
  components: {
    topBody,
    navTab
  },
  data() {
    return {
      userInfo: {},
      orderList: [],
      imgServer: imgServer
    };
  },
  mounted: function() {
    this.getOrderList();
    this.getUserInfo();
  },
  methods: {
    getOrderList: function() {
      var that = this;
      this.$api.get("/getOrderList", null, function(res) {
        that.orderList = res.data;
        that.orderList.reverse();
      });
    },
    getUserInfo: function() {
      var that = this;
      this.$api.get("/getUserInfo", null, function(res) {
        that.userInfo = res.data.userInfo;
      });
    },
    updateOrder: function(orderId, newStatus) {
      if (newStatus === 0) {
        if (!confirm("确认取消订单？")) {
          return;
        }
      }
      if (newStatus === 4) {
        if (!confirm("确认收到货物了吗？")) {
          return;
        }
      }
      var that = this;
      this.$api.post(
        "/updateOrder",
        {
          orderId: orderId,
          newStatus: newStatus
        },
        function(res) {
          alert("订单操作成功！");
          that.orderList[0].order_status = newStatus;
        }
      );
    }
  },
  filters: {
    orderStatus: function(val) {
      switch (val) {
        case 1:
          return "待付款";
        case 2:
          return "待发货";
        case 3:
          return "待收货";
        case 4:
          return "待评论";
        case 5:
          return "已完成";
        case 0:
          return "订单已取消";
      }
    },
    formTime: function(val) {
      var t = new Date(val);
      return t.Format("yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#user {
  background-color: #fff;
}
.containe {
  overflow: hidden;
  .sidebar {
    width: 168px;
    float: left;
    margin-right: 17px;
    background-color: $proBottomBgColor;
    h2 {
      background-color: $activeBgColor;
      width: 168px;
      height: 66px;
      display: block;
      width: 100%;
      text-align: center;
      line-height: 66px;
      color: #fff;
      font-size: $navClassifyH3FontSize;
    }
    > ul {
      width: 168px;
      background-color: #000;
      padding-top: 28px;
      padding-bottom: 1px;
      a {
        color: #fff;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
      }
      > li {
        margin-bottom: 28px;
        .active {
          background-color: $activeBgColor;
        }
        h3 {
          height: 25px;
          a {
            line-height: 25px;
            display: block;
            font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
            color: #fff;
            padding-left: 22px;
            width: 146px;
            height: 100%;
          }
        }
        h3:hover {
          background-color: $activeBgColor;
        }
        > ul {
          li {
            height: 25px;
            line-height: 25px;
            a {
              display: block;
              padding-left: 22px;
              line-height: 25px;
              width: 146px;
              height: 100%;
            }
          }
          li:hover {
            background-color: $activeBgColor;
          }
        }
      }
    }
  }
  .main {
    float: left;
    width: 1015px;
    .user_info {
      padding: 29px 0 24px 31px;
      background-color: $proBottomBgColor;
      overflow: hidden;
      .head {
        width: 122px;
        float: left;
        > img {
          display: block;
          width: 122px;
          height: 122px;
          border-radius: 61px;
        }
        > a {
          display: block;
          text-align: center;
          color: #1d8298;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          margin-top: 16px;
        }
      }
      .info {
        float: left;
        margin-left: 35px;
        > h3 {
          color: #ab5e04;
          font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
          margin-bottom: 22px;
        }
        > span,
        > p {
          display: block;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
          line-height: 27px;
        }
        > p {
          margin-bottom: 37px;
          > span {
            margin-right: 28px;
          }
        }
        > div {
          a {
            color: #000;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            margin-right: 22px;
            img {
              vertical-align: middle;
              margin-right: 3px;
            }
          }
        }
      }
    }
    .my_order {
      margin-top: 30px;
      padding-bottom: 20px;
      > h2 {
        height: 40px;
        line-height: 40px;
        padding-left: 37px;
        width: calc(100% - 37px);
        background-color: $proBottomBgColor;
        font-weight: normal;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        color: #000;
      }
      .order_thead {
        overflow: hidden;
        height: 35px;
        width: 100%;
        > li {
          height: 35px;
          line-height: 35px;
          float: left;
          color: $topAndNavColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        }
        .time {
          margin-left: 23px;
          width: 350px;
        }
        .order_num {
          width: 303px;
          > span {
            color: #000;
          }
        }
        .store_name {
          color: #000;
          margin-right: 130px;
          > span {
            font-weight: bolder;
          }
        }
        .order_status {
          > span {
            font-weight: bolder;
          }
          color: #000;
        }
      }
      .order_list {
        display: block;
        border: 1px solid #bfbfbf;
        width: calc(100% - 2px);
        li {
          overflow: hidden;
          padding: 21px 0;
          border-top: 1px solid #bfbfbf;
          border-bottom: 1px solid #bfbfbf;
          font-size: $topFontSize;
          position: relative;
          > div.orderPro {
            margin-left: 36px;
            width: 490px;
            float: left;
            > a {
              float: left;
              display: block;
              width: 112px;
              height: 112px;
              border: 1px solid $topAndFooterBgColor;
              > img {
                display: block;
                width: 100%;
              }
            }
            > div {
              float: left;
              width: 180px;
              margin-left: 30px;
              > a {
                line-height: 23px;
                display: block;
                margin-bottom: 24px;
                font-size: $topFontSize;
                color: $topAndNavColor;
              }
              > p {
                margin-top: 5px;
                font-size: $topFontSize;
                color: $topAndNavColor;
                img {
                  vertical-align: middle;
                  margin-right: 8px;
                }
              }
              p:first-of-type {
                color: #556fb5;
              }
            }
            .color {
              line-height: 23px;
              color: $topAndNavColor;
              margin-left: 35px;
            }
          }
          .price,
          .count {
            width: 170px;
            float: left;
            line-height: 23px;
            color: $topAndNavColor;
            a {
              font-size: $topFontSize;
              color: #1d8298;
            }
          }
          .count {
            width: 80px;
          }
          .handle {
            float: left;
            width: 87px;
            margin: 0 40px 0 30px;
            color: #1d8298;
            a {
              color: #1d8298;
              line-height: 23px;
            }
            .del,
            .to_mylove,
            .attention {
              cursor: pointer;
              line-height: 23px;
              text-align: left;
              display: block;
            }
          }
          > em {
            font-style: normal;
            font-weight: bold;
            color: #000;
            line-height: 23px;
          }
        }
      }
    }
  }
}
</style>
