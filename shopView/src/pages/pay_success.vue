<template>
  <div id="pay_success">
    <topBody/>
    <navTab/>
    <ul class="crumbs">
            <li>
                <router-link to="index">首页</router-link>
            </li>
            <li> > </li>
            <li>
                <router-link to="user">我的微动</router-link>
            </li>
            <li> > </li>
            <li>
                <a href="javascript:void(0)">确认支付</a>
            </li>
        </ul>
    <div class="containe">
            <div class="thead">
                <h2>结算页</h2>
                <ul class="progressbar">
                    <li class="done">
                        <span>1</span>
                        <h5>1.我的购物车</h5>
                    </li>
                    <li class="done">
                        <span>2</span>
                        <h5>2.核对定单信息</h5>
                    </li>
                    <li class="on">
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
                <div class="state">
                    <img src="../assets/images/success_icon.png" alt="">
                </div>
                <div class="pay_info">
                    <h3>恭喜您，支付成功啦！</h3>
                    <span>您已成功支付<em>￥{{orderProce}} 元 随机减（{{money}}元）</em><span>订单编号：{{orderId}}</span></span>
                    <p>温馨提示：您已支付成功，马上为您发货。订单状态更新可能在短期延迟，建议您半小时后再查询您的支付情况。</p>
                    <div>
                        <span>你还可以</span>
                        <router-link to="shop_list">继续购物</router-link>
                        <router-link :to="{name:'order_details',query:{orderId:orderId}}">查看订单</router-link>
                    </div>

                </div>
            </div>
        </div>
  </div>
</template>

<script>
import topBody from "@/components/topBody";
import navTab from "@/components/navTab";
export default {
  components: {
    topBody,
    navTab
  },
  data() {
    return {
      orderProce: 0,
      orderId: "",
      money: 0
    };
  },
  mounted: function() {
    var query = this.$route.query;
    if (!query.orderProce || !query.money || !query.orderId) {
      history.back();
      return;
    }
    this.orderProce = query.orderProce;
    this.orderId = query.orderId;
    this.money = query.money;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#pay_success {
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
    width: 100%;
    background-color: $proBottomBgColor;
    overflow: hidden;
    padding: 104px 0 184px 0;
    margin-bottom: 134px;
    .state {
      width: 124px;
      height: 103px;
      float: left;
      margin: 0 65px 0 263px;
      img {
        width: 100%;
      }
    }
    .pay_info {
      float: left;
      padding-top: 8px;
      > h3 {
        color: #1f9032;
        font-size: $telFontSize;
        margin-bottom: 34px;
      }
      > span {
        color: #010101;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        display: block;
        margin-bottom: 10px;
        > em {
          color: $activeBgColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          margin-right: 16px;
          font-weight: bold;
          font-style: normal;
        }
        > span {
          color: #000;
        }
      }
      > p {
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        margin-bottom: 30px;
      }
      > div {
        overflow: hidden;
        line-height: 33px;
        > span {
          float: left;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
        }
        > a:first-of-type {
          width: 120px;
          height: 33px;
          float: left;
          line-height: 33px;
          text-align: center;
          color: #fff;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          background: url("../assets/images/btn_bg.png") no-repeat;
          margin: 0 30px;
        }
        > a:last-of-type {
          color: #1d8298;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        }
      }
    }
  }
}
</style>
