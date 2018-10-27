<template>
  <div id="confirm_order">
    <topBody/>
    <navTab :index="-1"/>
        <ul class="crumbs">
            <li>
                <router-link to="index">首页</router-link>
            </li>
            <li> > </li>
            <li>
                <router-link to="shop_cart">我的购物车</router-link>
            </li>
            <li> > </li>
            <li><a href="javascript:void(0)">确认定单</a></li>
        </ul>
        <div class="containe">
            <div class="thead">
                <h2>结算页</h2>
                <ul class="progressbar">
                    <li class="done">
                        <span>1</span>
                        <h5>1.我的购物车</h5>
                    </li>
                    <li class="on">
                        <span>2</span>
                        <h5>2.核对定单信息</h5>
                    </li>
                    <li>
                        <span>3</span>
                        <h5>3.确认支付</h5>
                    </li>
                    <li>
                        <span>4</span>
                        <h5>4.确认收货</h5>
                    </li>
                </ul>
            </div>

            <div class="main">
                <h2>填写并核对订单信息</h2>
                <div class="site_info">
                    <div>
                        <h3>收货人信息</h3>
                        <a class="add_site" @click="toAddAddress">新增收货地址</a>
                    </div>
                    <ul class="site_list" v-if="addressList.length!==0" v-show="isShowAddress">
                        <li :class="{active:selectAddressId===item.address_id}" v-for="(item ,i ) in addressList" :key="i" @click="selectTheAddress(item.address_id,i)">
                            <span class="simple">{{item.address_receiver}} {{item.address_area}}</span>
                            <span class="name">{{item.address_receiver}}</span>
                            <span class="site">{{item.address_area}}{{item.address_details}}</span>
                            <span class="tel">{{item.address_phone}}</span>
                            <span class="edit"><a @click="toAddress(item.address_id)" :href="'address.html?addressIndex='+i">编辑</a></span>
                            <span class="default" @click="setDrfaultAddress(item.address_id,i)" v-if="!item.address_default">设为默认地址</span>
                            <span class="default" style="color:red" v-else>默认地址</span>
                        </li>
                    </ul>
                    <h5 style="text-align:center;" v-else>您还没添加收货地址，点击右上角 “新增收货地址” 吧</h5>
                    <span class="up_site" @click="isShowAddress=!isShowAddress">{{isShowAddress?'收起':'展开'}}地址</span>
                    <i></i>
                </div>
                <div class="order_info">
                    <h3>确认定单信息</h3>
                    <ul class="title">
                        <li>商品</li>
                        <li>商品属性</li>
                        <li>单价</li>
                        <li>数量</li>
                        <li>优惠方式</li>
                        <li>小计</li>
                    </ul>
                    <div class="items">
                        <ul class="item">
                            <li v-for="(item,i) in proList" :key="i">
                                <div class="info ">
                                    <router-link :to="{name:'pro_details',query:{proId:item.goods_id}}">
                                      <img :src="imgServer+item.goods_img[0]" alt=" ">
                                    </router-link>
                                    <div>
                                        <router-link :to="{name:'pro_details',query:{proId:item.goods_id}}">{{item.goods_name}}</router-link>
                                        <p><img src="../assets/images/7_icon.png" alt=" ">支持7天无理由退货</p>
                                        <p><img src="../assets/images/bao_icon.png" alt=" ">选廷保</p>
                                    </div>
                                </div>
                                <span class="color ">颜色分类：<span>{{item.goods_color}}</span></span>
                                <span class="price ">￥{{item.goods_price}}</span>
                                <span class="count ">{{orderProList[i].qty}}</span>
                                <span class="tips">全国联保</span>
                                <div class="subtotal ">
                                    <em>￥{{item.goods_price * orderProList[i].qty}}</em>
                                </div>
                            </li>
                        </ul>
                        <div class="result">
                            <div>
                                <form>
                                    <label>给卖家留言：</label>
                                    <textarea class="msg" v-model="orderNote" placeholder="选填：对本次交易的说明（建议直填写已和卖家协商一致的内容）"></textarea>
                                </form>
                            </div>
                            <div>
                                <span class="mode">运送方式：<span>普通配送   快递   免邮</span></span>
                                <span class="safe">运费险：<span>卖家赠送，确认收货前退货，可获保赔付</span></span>
                            </div>
                            <span class="sum">合计（含运费）<em>￥{{totalPrice}} </em></span>
                        </div>
                    </div>
                </div>
                <div class="part">
                    <p class="result_price">应付总额：<em>￥{{totalPrice}}</em></p>
                    <p class="result_site">寄送至：
                        <span v-if="selectAddressId!==''">{{addressList[index].address_area}}{{addressList[index].address_details}}</span>
                        <span v-else>空</span>
                    </p>
                    <p class="user">收货人：
                        <span v-if="selectAddressId!==''">{{addressList[index].address_receiver}} {{addressList[index].address_phone}}</span>
                        <span v-else>空</span>
                    </p>
                </div>
                <button @click="confirm" :disabled="!isCanSub" class="sub">提交订单</button>
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
      orderNote: "",
      addressList: [],
      proList: [],
      orderProList: [],
      imgServer,
      totalPrice: 0,
      selectAddressId: "",
      isShowAddress: true,
      index: 0
    };
  },
  mounted: function() {
    var querty = this.$route.query;
    if (!querty.orderPro) {
      this.$router.replace("index");
      return;
    }
    var that = this;
    this.getAddressList();
    this.orderProList = JSON.parse(querty.orderPro);
    this.orderProList.forEach(function(item) {
      that.getProDetail(item.proId, item.qty); // 商品详情
    });
  },
  computed: {
    isCanSub: function() {
      if (this.selectAddressId !== "" && this.proList.length !== 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    selectTheAddress: function(addressId, index) {
      this.selectAddressId = addressId;
      this.index = index;
    },
    toAddAddress: function() {
      this.$router.push({
        name:'address',
        query:{
          orderPro:JSON.stringify(this.orderProList)
        }
      });
    },
    getAddressList: function() {
      var that = this;
      this.$api.get("/getAddressList", null, function(res) {
        that.addressList = res.data;
        that.addressList.forEach(function(item) {
          if (item.address_default) {
            that.selectAddressId = item.address_id;
            return;
          }
        });
      });
    },
    getProDetail: function(proId, qty) {
      var that = this;
      this.$api.get(
        "/public/getProDetail",
        {
          proId: proId
        },
        function(res) {
          that.proList.push(res.data.items);
          that.totalPrice = qty * res.data.items.goods_price + that.totalPrice;
        }
      );
    },
    setDrfaultAddress: function(addressId, i) {
      var that = this;
      this.$api.post(
        "/setDefault",
        {
          addressId: addressId,
          address_default: true
        },
        function(res) {
          that.addressList.forEach(function(item) {
            item.address_default = false;
          });
          that.addressList[i].address_default = true;
        }
      );
    },
    confirm: function() {
      console.log({
        proList: this.orderProList,
        addressId: this.selectAddressId, //地址Id
        orderNote: this.orderNote, // 订单备注
        postage: 0 //运费
      });
      var that = this;
      var timeOut;
      this.$api.post(
        "/confirmOrder",
        {
          proList: this.orderProList,
          addressId: this.selectAddressId, //地址Id
          orderNote: this.orderNote, // 订单备注
          postage: 0 //运费
        },
        function(res) {
          that.orderProList.map(function(item) {
            that.$api.post(
              "/delCartPro",
              {
                proId: item.proId
              },
              function() {
                if (!!timeOut) {
                  clearTimeout(timeOut);
                }
                timeOut = setTimeout(function() {
                    that.$router.push({
                      name:'pay',
                      query:{
                        orderId:res.data.orderInfo.order_id
                      }
                    });
                  timeOut = null;
                }, 100);
              }
            );
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#confirm_order {
  background-color: #fff;
}
.containe {
  .thead {
    overflow: hidden;
    margin-bottom: 63px;
    > h2 {
      float: left;
      color: #000;
      font-size: $navAndTitleAndSearchFontSize;
      width: 143px;
      height: 36px;
      padding-top: 35px;
    }
    .progressbar {
      float: right;
      height: 31px;
      margin-top: 27px;
      li {
        float: left;
        position: relative;
        width: 205px;
        height: 7px;
        background-color: #c5c5c5;
        > span,
        > h5 {
          position: absolute;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
        }
        > span {
          width: 31px;
          line-height: 31px;
          height: 31px;
          border-radius: 15.5px;
          background-color: #c5c5c5;
          color: #fff;
          font-weight: bold;
          margin: auto;
        }
        > h5 {
          color: $topAndNavColor;
          top: 26px;
          width: 100%;
          font-weight: normal;
        }
      }
      > li:first-of-type {
        border-radius: 3px 0 0 3px;
      }
      > li:last-of-type {
        border-radius: 0 3px 3px 0;
      }
      .on {
        background-color: $activeBgColor;
        border-radius: 3px;
        > span {
          background-color: $activeBgColor;
        }
        > h5 {
          color: $activeBgColor;
        }
      }
      .done {
        background-color: #ffdede;
        > span {
          background-color: #ffdede;
        }
        > h5 {
          color: #ffdede;
        }
      }
    }
  }
  .main {
    overflow: hidden;
    > h2 {
      font-size: $navClassifyH3FontSize;
      color: #333;
    }
    .site_info {
      width: 100%;
      border: 1px solid #dcdcdc;
      border-bottom: none;
      padding-top: 12px;
      padding-bottom: 122px;
      margin-top: 14px;
      > div {
        width: 1152px;
        margin: 0 auto;
        overflow: hidden;
        > h3 {
          float: left;
          font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
          color: #020202;
          font-weight: normal;
        }
        .add_site {
          float: right;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: #010101;
          cursor: pointer;
        }
      }
      .site_list {
        width: 1129px;
        margin: 18px auto 0 auto;
        > li {
          width: 100%;
          color: $topAndNavColor;
          font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
          height: 32px;
          background-color: #dcdcdc;
          cursor: pointer;
          margin-bottom: 16px;
          .simple,
          .name,
          .site,
          .tel {
            float: left;
            height: 32px;
            line-height: 32px;
          }
          .simple {
            width: 170px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #c9c9c9;
          }
          .name {
            padding: 0 20px;
          }
          .site {
            padding-right: 20px;
          }
          .default {
            float: right;
            cursor: pointer;
            color: #010101;
            height: 32px;
            line-height: 32px;
          }
          .edit {
            margin: 0 5px 0 19px;
            float: right;
            > a {
              cursor: pointer;
              color: #010101;
              height: 32px;
              line-height: 32px;
              font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
            }
          }
        }
        > li:hover {
          background-color: #ffdede;
          .simple {
            // border: 1px solid $activeBgColor;
          }
        }
        .active {
          background-color: #ffdede;
          .simple {
            border: 1px solid $activeBgColor;
            background: url(../assets/images/select_bg2.png) no-repeat right
              bottom #fff;
          }
        }
      }
      .up_site {
        cursor: pointer;
        margin-left: 35.5px;
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
      }
      > i {
        display: block;
        width: 1168px;
        height: 2px;
        background-color: #a0a0a0;
        margin: 18px auto 0 auto;
      }
    }
    .order_info {
      width: 100%;
      position: relative;
      margin-bottom: 40px;
      > h3 {
        color: #020202;
        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
        font-weight: normal;
        position: absolute;
        top: -95px;
        left: 24px;
      }
      .title {
        width: calc(100% + 2px);
        overflow: hidden;
        height: 50px;
        background-color: #e5e5e5;
        margin: 11px 0 14px 0;
        position: absolute;
        top: -72px;
        left: 0;
        > li {
          float: left;
          height: 50px;
          line-height: 50px;
          color: $topAndNavColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        }
        li:nth-of-type(1) {
          margin-left: 28px;
          margin-right: 75px;
          min-width: 386px;
        }
        li:nth-of-type(2) {
          min-width: 165px;
        }
        li:nth-of-type(3) {
          min-width: 166px;
          text-align: center;
        }
        li:nth-of-type(4) {
          min-width: 84px;
          text-align: center;
        }
        li:nth-of-type(5) {
          min-width: 115px;
          text-align: center;
          margin-left: 45px;
        }
        li:nth-of-type(6) {
          min-width: 116px;
          text-align: right;
        }
      }
      .items {
        > h3 {
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
          font-weight: normal;
          line-height: 28px;
          margin-left: 16px;
        }
        .item {
          border-top: 1px solid #aaa;
          width: 100%;
          > li {
            overflow: hidden;
            padding: 20px 0 21px 0;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: $topAndNavColor;
            border: 1px solid #bfbfbf;
            .info,
            .color,
            .price,
            .count,
            .subtotal,
            .tips {
              float: left;
            }
            .info {
              overflow: hidden;
              min-width: 386px;
              margin-left: 28px;
              margin-right: 75px;
              > a {
                float: left;
                border: 1px solid $topAndFooterBgColor;
                width: 112px;
                height: 112px;
                margin: 0 18px 0 12px;
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
              > div {
                float: left;
                width: 237px;
                > a {
                  line-height: 23px;
                  display: block;
                  margin-bottom: 22px;
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
            }
            .color,
            .price {
              line-height: 23px;
            }
            .color {
              min-width: 165px;
            }
            .price {
              min-width: 166px;
              text-align: center;
            }
            .count {
              min-width: 84px;
              text-align: center;
              color: #000000;
            }
            .tips {
              min-width: 115px;
              text-align: center;
              margin-left: 45px;
            }
            .subtotal {
              min-width: 116px;
              text-align: right;
              em,
              span {
                display: block;
                text-align: right;
                line-height: 23px;
              }
              em {
                font-style: normal;
                font-weight: bold;
                color: #000;
              }
            }
          }
        }
        .result {
          width: 100%;
          background-color: #ffdede;
          overflow: hidden;
          color: $topAndNavColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          padding-top: 12px;
          padding-bottom: 20px;
          > div:first-of-type {
            float: left;
            margin-left: 36px;
            .bill {
              margin-left: 2px;
              .edit {
                color: #9a7676;
                cursor: pointer;
                margin-left: 24px;
              }
            }
            > form {
              > textarea {
                margin-left: 5px;
                vertical-align: top;
                width: 269px;
                min-height: 53px;
                background-color: #fff;
                border: 1px solid #d2d2d2;
                color: #666;
                font-size: 13.5px;
                resize: none;
                padding-left: 5px;
                outline: none;
              }
            }
          }
          > div:last-of-type {
            width: 250px;
            float: right;
            margin-right: 200px;
            .mode {
              display: block;
            }
            .safe {
              display: block;
              margin-top: 25px;
              > span {
                float: right;
                display: block;
                width: 192px;
              }
            }
          }
          .sum {
            clear: both;
            float: right;
            margin-right: 20px;
            > em {
              color: $activeBgColor;
              font-weight: bold;
              font-style: normal;
            }
          }
        }
      }
    }
    .part {
      width: 100%;
      height: 80px;
      padding-top: 5px;
      background-color: #dcdcdc;
      .result_price,
      .result_site,
      .user {
        text-align: right;
        margin-right: 21px;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        color: #000;
        line-height: 25px;
      }
      .result_price {
        font-weight: bold;
        > em {
          font-style: normal;
          font-size: $navAndTitleAndSearchFontSize;
          color: $activeBgColor;
        }
      }
      .result_site {
        font-weight: bold;
        > span {
          font-weight: normal;
        }
      }
      .user {
        font-weight: normal;
      }
    }
    .sub {
      float: right;
      margin: 12px 22px 61px 0;
      width: 155px;
      height: 47px;
      border-radius: 3px;
      color: #fff;
      background-color: $activeBgColor;
      font-size: $navAndTitleAndSearchFontSize;
      line-height: 47px;
      text-align: center;
      font-weight: bold;
      cursor: pointer;
      &:disabled {
        opacity: 0.5;
      }
    }
  }
}
</style>
