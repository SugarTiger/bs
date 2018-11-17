<template>
  <div id="order">
    <topBody/>
    <navTab :index="-1"/>
    <ul class="crumbs">
            <li>
                <router-link to="index">首页</router-link>
            </li>
            <li> > </li>
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
                            <li>
                                <router-link to="user">个人资料</router-link>
                            </li>
                            <li>
                                <router-link to="address">管理收货地址</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="active">
                        <h3>
                            <router-link to="order">订单中心</router-link>
                        </h3>
                    </li>
                </ul>
            </div>
              <div class="main">
                <ul class="order_nav">
                    <li  :class="{active:orderStatus===''}" @click="getStatus(null)">
                        <a href="javascript:void(0)">全部订单</a>
                    </li>
                    <li :class="{active:orderStatus===1}"  @click="getStatus(1)">
                        <a href="javascript:void(0)">待付款</a>
                    </li>
                    <li :class="{active:orderStatus===2}"  @click="getStatus(2)">
                        <a href="javascript:void(0)">待发货</a>
                    </li>
                    <li :class="{active:orderStatus===3}"  @click="getStatus(3)">
                        <a href="javascript:void(0)">待收货</a>
                    </li>
                    <li :class="{active:orderStatus===4}"  @click="getStatus(4)">
                        <a href="javascript:void(0)">待评价</a>
                    </li>
                    <li :class="{active:orderStatus===5}"  @click="getStatus(5)">
                        <a href="javascript:void(0)">已完成</a>
                    </li>
                </ul>
                <div class="order_search">
                    <input type="text" placeholder="商品名称/订单号/商品类型" v-model="keyWords">
                    <button @click="search">搜索</button>
                </div>
                <ul class="title">
                    <li class="all_select" style="visibility: hidden;">
                        <span class=""></span>
                        <input type="checkbox">
                        <h3>全选</h3>
                    </li>
                    <li>商品</li>
                    <li>商品属性</li>
                    <li>数量</li>
                    <li>单价</li>
                    <li>交易状态</li>
                    <li>操作</li>
                </ul>
                <ul class="order_list" v-if="orderList.length!==0">
                    <li v-for="(order,i) in orderList" :key="i">
                        <ul class="order_thead">
                            <li class="time">{{order.order_create_time | formTime}}</li>
                            <li class="order_num">订单号：
                                <span>{{order.order_id}}</span>
                            </li>
                            <li class="del" @click="removeOrder(order.order_id,i)">
                                <img src="../assets/images/del_icon.png" alt="">
                            </li>
                        </ul>
                        <div class="order_main" v-for="(pro,j) in order.proList" :key="j">
                            <div class="checkbox" style="visibility: hidden;">
                                <span class=""></span>
                                <input type="checkbox">
                            </div>
                            <div class="info">
                                <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">
                                  <img :src="imgServer+pro.goods_img[0]" alt="">
                                </router-link>
                                <div>
                                    <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">
                                      {{pro.goods_type}} {{pro.goods_name}}
                                    </router-link>
                                    <p>
                                        <img src="../assets/images/7_icon.png" alt="">支持7天无理由退货</p>
                                    <p>
                                        <img src="../assets/images/bao_icon.png" alt="">选廷保</p>
                                </div>
                                <span class="color">颜色：
                                    <span>{{pro.goods_color}}</span>
                                </span>
                            </div>
                            <span class="count">{{pro.goods_quantity}}</span>
                            <span class="price">￥{{pro.goods_price}}</span>
                            <div class="detail" v-if="j===0">
                                <span class="status">{{order.order_status|orderStatus}}</span>
                                <router-link :to="{name:'order_details',query:{orderId:order.order_id}}" class="order_detail">
                                  订单详情
                                </router-link>
                            </div>
                            <div class="handle" :style="{marginLeft:  (j!==0&&order.order_status===4)?'135px':'auto'}">
                                <router-link v-if="j===0&&order.order_status===1" :to="{name:'pay',query:{orderId:order.order_id}}" class="com">
                                  去付款
                                </router-link>
                                <a href="javascript:void(0)" v-if="j===0&&(order.order_status===1||order.order_status===2)" @click="updateOrder(order.order_id,0,i)" class="com" style="color:red">取消订单</a>
                                <a href="javascript:void(0)" v-if="j===0&&(order.order_status===3)" @click="updateOrder(order.order_id,4,i)" class="com">确认收货</a>
                                <a href="javascript:void(0)" class="com" v-if="j===0&&(order.order_status===0||order.order_status===5)" @click="removeOrder(order.order_id,i)" style="color:red">删除订单</a>
                                <router-link v-if="order.order_status===4" :to="{name:'comment',query:{proId:pro.goods_id,orderId:order.order_id}}" class="com">
                                  去评价
                                </router-link>
                            </div>
                        </div>
                    </li>
                </ul>
                <h5 style="text-align: center;" v-else>暂无相关订单</h5>
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
      orderStatus: "",
      orderList: [],
      imgServer,
      tempList: [],
      keyWords: ""
    };
  },
  mounted: function() {
    this.getOrderList();
  },
  methods: {
    getStatus: function(status) {
      if (!status) {
        this.orderStatus = "";
        this.orderList = this.tempList;
        return;
      } else {
        this.orderStatus = status;
        this.orderList = this.tempList.filter(function(item) {
          return item.order_status == status;
        });
      }
    },
    removeOrder: function(orderId, i) {
      var that = this;
      this.$confirm("确认删除订单？注意：此项不可恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          this.$api.post(
            "/delOrder",
            {
              orderId: orderId
            },
            function(res) {
              if (res.status === 1) {
                that.orderList.splice(i, 1);
              }
            }
          );
        })
        .catch(() => {});
    },
    getOrderList: function(status) {
      var that = this;
      this.$api.get(
        "/getOrderList",
        {
          type: status
        },
        function(res) {
          that.orderList = res.data;
          that.orderList.reverse();
          that.tempList = that.orderList;
          console.log(that.tempList);
        }
      );
    },
    updateOrder: function(orderId, newStatus, i) {
      var that = this;
      var msg = '';
      if(newStatus === 0){
        msg = "确认取消订单？";
      } else if(newStatus === 4){
        msg = "确认收到货物了吗？";
      }
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          this.$api.post(
        "/updateOrder",
        {
          orderId: orderId,
          newStatus: newStatus
        },
        function(res) {
          that.$alert("订单操作成功！");
          that.orderList[i].order_status = newStatus;
        }
      );
        })
        .catch(() => {});
    },
    search: function() {
      var that = this;
      if (this.keyWords === "") {
        this.orderList = this.tempList;
        return;
      }
      this.orderList = this.tempList.filter(function(item) {
        var orderId = item.order_id.toString();
        if (orderId.indexOf(that.keyWords) !== -1) {
          return true;
        } else {
          for (var i = 0; i < item.proList.length; i++) {
            if (
              item.proList[i].goods_name.indexOf(that.keyWords) !== -1 ||
              item.proList[i].goods_type.indexOf(that.keyWords) !== -1
            ) {
              return true;
            }
          }
          return false;
        }
      });
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
#order {
  background-color: #fff;
}
.containe {
  overflow: hidden;
  margin-bottom: 28px;
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
      > li.active {
        background-color: $activeBgColor;
      }
    }
  }
  .main {
    float: left;
    width: 1012px;
    .order_nav {
      width: 100%;
      height: 47px;
      background: $proBottomBgColor;
      > li {
        float: left;
        line-height: 47px;
        height: 47px;
        cursor: pointer;
        padding: 0 30px;
        margin-right: 18px;
        font-size: 14px;
        color: #000;
        a {
          font-size: 14px;
          color: #000;
        }
      }
      > li:hover,
      .active {
        color: $activeBgColor;
        > a {
          color: $activeBgColor;
        }
      }
    }
    .order_search {
      float: right;
      width: 275px;
      height: 31px;
      line-height: 31px;
      background-color: $activeBgColor;
      margin: 7px 0;
      > input {
        float: left;
        width: 222px;
        height: 25px;
        color: #aaaaaa;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        padding-left: 8px;
        line-height: 25px;
        outline: none;
        margin: 3px 0 0 3px;
      }
      > button {
        float: left;
        background-color: $activeBgColor;
        cursor: pointer;
        color: #fff;
        line-height: 31px;
        height: 31px;
        text-align: center;
        width: 42px;
      }
    }
    .title {
      clear: both;
      height: 43px;
      background-color: #e5e5e5;
      width: calc(100% - 46px);
      padding: 0 23px;
      margin-bottom: 7px;
      li {
        float: left;
        line-height: 43px;
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
      }
      .all_select {
        width: 141px;
        > span {
          margin-top: 16px;
        }
      }
      li:nth-of-type(2) {
        min-width: 244px;
      }
      li:nth-of-type(3) {
        min-width: 125px;
      }
      li:nth-of-type(4) {
        min-width: 83px;
        text-align: center;
      }
      li:nth-of-type(5) {
        min-width: 115px;
        text-align: center;
      }
      li:nth-of-type(6) {
        min-width: 146px;
        text-align: center;
      }
      li:nth-of-type(7) {
        min-width: 100px;
        text-align: center;
      }
    }
    .order_list {
      padding-bottom: 20px;
      > li {
        overflow: hidden;
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
            width: 207px;
          }
          .order_num {
            width: 303px;
            > span {
              color: #000;
            }
          }
          .store_name {
            cursor: pointer;
            color: #000;
          }
          .call_me {
            color: #000;
            cursor: pointer;
            margin-left: 95px;
          }
          .del {
            margin-right: 8px;
            float: right;
            cursor: pointer;
            img {
              vertical-align: middle;
            }
          }
        }
        .order_main {
          overflow: hidden;
          padding: 17px 0 17px 17px;
          width: calc(100% - 19px);
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
          border: 1px solid #bfbfbf;
          a {
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: $topAndNavColor;
          }
          .checkbox,
          .info,
          .color,
          .price,
          .count,
          .detail,
          .handle {
            float: left;
          }
          .checkbox {
            width: auto;
            padding-left: 5px;
            span {
              margin: 2px 0 0 0;
            }
          }
          .info {
            overflow: hidden;
            width: 472px;
            margin-right: 20px;
            > a {
              float: left;
              border: 1px solid $topAndFooterBgColor;
              width: 94px;
              height: 94px;
              margin: 0 15px 0 8px;
              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            > div {
              float: left;
              width: 200px;
              > a {
                line-height: 19px;
                display: block;
                margin-bottom: 15px;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                color: $topAndNavColor;
              }
              > p {
                margin-top: 5px;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
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
              width: 96px;
              margin-left: 45px;
            }
          }
          .color,
          .price {
            line-height: 19px;
          }
          .price {
            width: 103px;
            text-align: center;
            margin-right: 40px;
          }
          .count {
            width: 97px;
            text-align: center;
          }
          .detail {
            width: 81px;
            margin-right: 52px;
            > span,
            > a {
              display: block;
              text-align: center;
              line-height: 19px;
            }
            > a {
              color: #556fb5;
            }
          }
          .handle {
            width: 78px;
            .com,
            .buy {
              cursor: pointer;
              line-height: 19px;
              text-align: center;
              display: block;
            }
          }
        }
      }
    }
    .shop {
      overflow: hidden;
      margin: 17px 0 0 8px;
      float: left;
      > li {
        float: left;
        margin-left: 5px;
        border: 1px solid #dcdcdc;
        padding: 0 10px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #666666;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        cursor: pointer;
      }
      .all_select {
        visibility: hidden;
        border: none;
        > span {
          margin-top: 4px;
        }
      }
    }
    .all_select,
    .checkbox {
      overflow: hidden;
      > span {
        display: block;
        height: 12px;
        width: 12px;
        background: url(../assets/images/checkbox_false2.png) no-repeat;
        cursor: pointer;
        float: left;
        margin-right: 6px;
      }
      > input {
        display: none;
      }
      > h3 {
        float: left;
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        cursor: pointer;
        font-weight: normal;
      }
      .boxchecked {
        background-image: url(../assets/images/checkbox_true2.png);
      }
    }
  }
  .page {
    float: right;
    margin: 17px 28px 0 0;
    li {
      float: left;
      margin: 0 6px;
    }
    .on {
      a {
        color: $activeBgColor;
      }
    }
    li:hover {
      a {
        color: $activeBgColor;
      }
    }
    a {
      font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
    }
  }
}
</style>
