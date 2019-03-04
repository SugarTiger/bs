<template>
  <div id="order_details">
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
                <router-link to="order">订单中心</router-link>
            </li>
            <li> > </li>
            <li>
                <a href="javascript:void(0)">订单详情</a>
            </li>
        </ul>
        <div class="containe">
            <div class="order_status">
                <div>
                    <p class="order_num">订单号：
                        <span>{{orderInfo.order_id}}</span>
                    </p>
                    <h3>{{orderInfo.order_status | orderStatus}}</h3>
                </div>
                <div>
                    <h5 v-if="orderInfo.order_status===5">订单已经完成，感谢您在微动商城购物，欢迎您对本次交易及所购商品进行评价</h5>
                    <ul>
                        <li :class="{done:orderInfo.order_status>0}">
                            <span>提交订单</span>
                            <span class="date">{{orderInfo.order_create_time | formTime}}</span>
                            <i></i>
                        </li>
                        <li :class="{done:orderInfo.order_status>1}">
                            <span>付款成功</span>
                            <span class="date" v-if="orderInfo.order_pay_time">{{orderInfo.order_pay_time | formTime}}</span>
                            <i></i>
                        </li>
                        <li :class="{done:orderInfo.order_status>2}">
                            <span>商品出库</span>
                            <span class="date" v-if="orderInfo.order_send_time">{{orderInfo.order_send_time | formTime}}</span>
                            <i></i>
                        </li>
                        <li :class="{done:orderInfo.order_status>3}">
                            <span>确认收货</span>
                            <span class="date" v-if="orderInfo.order_sh_time">{{orderInfo.order_sh_time | formTime}}</span>
                            <i></i>
                        </li>
                        <li :class="{done:orderInfo.order_status>4}">
                            <span>完成</span>
                            <span class="date" v-if="orderInfo.order_done_time">{{orderInfo.order_done_time | formTime}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ad_info" v-if="orderInfo.order_status>2">
                <div>
                    <a href="#">
                        <img src="../assets/images/kd.png" alt="">
                    </a>
                    <p>送货方式：
                        <span>普通快递</span>
                    </p>
                </div>
                <div>
                    <h3>物流信息</h3>
                    <ul>
                        <li>快递公司：
                            <span>{{orderInfo.kd_gs}}</span>
                        </li>
                        <li>运单号码：
                            <span>{{orderInfo.order_wl_num}}</span>
                        </li>
                        <li>
                            <h5>物流跟踪：</h5>
                            <ul>
                                <li>{{orderInfo.order_send_time | formTime}} 您的订单由第三方卖家拣货完毕，待出库交付{{orderInfo.kd_gs}}速递，运单号为{{orderInfo.order_wl_num}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="user_site">
                <dl>
                    <dt>收货人信息</dt>
                    <dd>
                        <h6>收货人：</h6>
                        <span>{{orderInfo.receiver}}</span>
                    </dd>
                    <dd>
                        <h6>地址：</h6>
                        <span>{{orderInfo.address}}</span>
                    </dd>
                    <dd>
                        <h6>手机号码：</h6>
                        <span>{{orderInfo.phone}}</span>
                    </dd>
                </dl>
                <dl>
                    <dt>配送信息</dt>
                    <dd>
                        <h6>配送方式：</h6>
                        <span>普通快递</span>
                    </dd>
                    <dd>
                        <h6>运费：</h6>
                        <span>¥ {{orderInfo.order_postage}} 元</span>
                    </dd>
                </dl>
                <dl>
                    <dt>付款信息</dt>
                    <dd>
                        <h6>付款方式：</h6>
                        <span>在线支付</span>
                    </dd>
                    <dd>
                        <h6>商品总额：</h6>
                        <span>¥ {{orderInfo.order_total_price - orderInfo.Fmoney}}</span>
                    </dd>
                    <dd>
                        <h6>应支付金额：</h6>
                        <span>¥ {{orderInfo.order_total_price}}</span>
                    </dd>
                    <dd>
                        <h6>运费金额：</h6>
                        <span>¥ {{orderInfo.order_postage}}</span>
                    </dd>
                    <dd>
                        <h6>订单优惠：</h6>
                        <span>¥ {{orderInfo.Fmoney}}</span>
                    </dd>
                </dl>
                <dl>
                    <dt>发票信息</dt>
                    <dd>
                        <h6>发票类型：</h6>
                        <span>普通发票</span>
                    </dd>
                    <dd>
                        <h6>发票抬头：</h6>
                        <span>个人</span>
                    </dd>
                    <dd>
                        <h6>发票内容：</h6>
                        <span>明细</span>
                    </dd>
                </dl>
            </div>
            <div class="pro_info">
                <h3></h3>
                <div class="list">
                    <ul class="title">
                        <li>商品</li>
                        <li>商品编号</li>
                        <li>单价</li>
                        <li>商品数量</li>
                        <li>操作</li>
                    </ul>
                    <ul class="pro_list">
                        <li v-for="(pro,i) in orderInfo.proList" :key="i">
                            <div>
                                <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">
                                  <img :src="imgServer+pro.goods_img[0]" alt="">
                                </router-link>
                                <div>
                                    <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">{{pro.goods_name}}</router-link>
                                    <p>
                                        <img src="../assets/images/7_icon.png" alt="">支持7天无理由退货</p>
                                    <p>
                                        <img src="../assets/images/bao_icon.png" alt="">选廷保</p>
                                </div>
                            </div>
                            <span>{{pro.goods_id}}</span>
                            <span>{{pro.goods_price}}</span>
                            <span>{{pro.goods_quantity}}</span>
                            <span>
                                <a href='javascript:void(0)' @click="toSubOrder(pro.goods_id)">立即购买</a>
                                <router-link :to="{name:'comment',query:{proId:pro.goods_id,orderId:orderInfo.order_id}}" v-if="orderInfo.order_status===4" class="com">去评价</router-link>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="result">
                    <div>
                        <h6>商品总额：</h6>
                        <span>¥ {{orderInfo.order_total_price - orderInfo.Fmoney}} 元</span>
                    </div>
                    <div>
                        <h6>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</h6>
                        <span>¥ {{orderInfo.order_postage}} 元</span>
                    </div>
                    <div class="all_price">
                        <h6>应付总额：</h6>
                        <span>¥ {{orderInfo.order_total_price}} 元</span>
                    </div>
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
  data(){
    return {
      orderInfo: {},
                imgServer:imgServer
    }
  },
  mounted: function () {
                var orderId = this.$route.query.orderId;
                if (!orderId) {
                    this.$router.push({
                      name:'order',
                    })
                    return;
                }
                this.getOrderInfo(orderId);
            },
            methods: {
                getOrderInfo: function (orderId) {
                    var that = this;
                    this.$api.get('/getOrderDetail', {
                        orderId: orderId
                    }, function (res) {
                        that.orderInfo = res.data
                    });
                },
                toSubOrder:function(proId){
                    this.$router.push({
                      name:'confirm_order',
                      query:{
                        isGoToBug:true,
                        orderPro:'[{"qty":1,"proId":'+proId+'}]'
                      }
                    })
                }
            },
            filters: {
                orderStatus: function (val) {
                    switch (val) {
                        case 1:
                            return '待付款';
                        case 2:
                            return '待发货';
                        case 3:
                            return '待收货';
                        case 4:
                            return '待评论';
                        case 5:
                            return '已完成';
                        case 0:
                            return '订单已取消';
                    }
                },
                formTime: function (val) {
                    if(!val)return val;
                    var t = new Date(val);
                    return t.Format('yyyy-MM-dd hh:mm')
                }
            }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#order_details {
  background-color: #fff;
}
.containe {
        .order_status {
            width: 100%;
            background: #fff;
            min-height: 181px;
            border-top: 1px solid $activeBgColor;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: $topAndNavColor;
            >div:first-of-type {
                margin: 12px 30px 0 0;
                height: 153px;
                float: left;
                width: 235px;
                padding-top: 7px;
                border-right: 1px solid #E5E5E5;
                .order_num,
                h3 {
                    width: 100%;
                    text-align: center;
                }
                h3 {
                    font-size: $navAndTitleAndSearchFontSize;
                    color: $activeBgColor;
                    margin-top: 55px;
                }
            }
            >div:last-of-type {
                float: left;
                margin-top: 20px;
                >h5 {
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    font-weight: normal;
                }
                ul {
                    margin-top: 25px;
                    height: 88px;
                    li {
                        position: relative;
                        float: left;
                        min-width: 90px;
                        opacity: 0.3;
                        &.done{
                            opacity: 1;
                        }
                        >i {
                            float: left;
                            height: 19px;
                            width: 144px;
                            background: url(../assets/images/arrows_icon8.png) no-repeat center;
                        }
                        >span {
                            float: left;
                        }
                        .date,
                        .time {
                            position: absolute;
                            left: 0;
                            line-height: 25px;
                        }
                        .date {
                            top: 19px;
                            width: 78px;
                        }
                        .time {
                            top: 38px;
                        }
                    }
                }
                ul::after {
                    display: block;
                    content: '';
                    clear: both;
                }
                >p {
                    background: url(../assets/images/user_icon2.png) no-repeat left center;
                    padding-left: 15px;
                    >span {
                        color: $activeBgColor;
                    }
                }
            }
        }
        .ad_info {
            margin-top: 36px;
            width: 100%;
            min-height: 313px;
            background: #fff;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: $topAndNavColor;
            >div:first-of-type {
                margin: 22px 30px 0 0;
                float: left;
                width: 235px;
                min-height: 269px;
                padding-top: 12px;
                border-right: 1px solid #E5E5E5;
                >a {
                    display: block;
                    width: 153px;
                    height: 127px;
                    border: 1px solid #DCDCDC;
                    margin: 0 auto 20px auto;
                    >img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                >p {
                    color: #000;
                    text-align: center;
                }
            }
            >div:last-of-type {
                float: left;
                margin-top: 16px;
                >h3 {
                    color: #000;
                    font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                }
                >ul {
                    margin-top: 16px;
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    color: $topAndNavColor;
                    >li {
                        line-height: 25px;
                        >h5 {
                            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                            color: $topAndNavColor;
                            font-weight: normal;
                            float: left;
                        }
                        >ul {
                            float: left;
                            >li {
                                line-height: 25px;
                            }
                            >li:first-of-type {
                                font-weight: bold;
                                color: $activeBgColor;
                            }
                        }
                    }
                    >li:nth-of-type(2) {
                        span {
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .user_site {
            margin-top: 37px;
            width: 100%;
            min-height: 236px;
            background: #fff;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: $topAndNavColor;
            >dl {
                min-height: 190px;
                margin-left: 34px;
                margin-top: 17px;
                padding-top: 13px;
                width: 265px;
                border-right: 1px solid #E5E5E5;
                float: left;
                >dt,
                >dd {
                    line-height: 26px;
                }
                >dd {
                    overflow: hidden;
                    h6,
                    span {
                        float: left;
                    }
                    h6 {
                        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                        font-weight: normal;
                        min-width: 75px;
                    }
                    span {
                        width: 170px;
                    }
                }
            }
        }
        .pro_info {
            margin-bottom: 66px;
            width: 100%;
            background: #fff;
            overflow: hidden;
            >h3 {
                background: #EEEEEE;
                height: 50px;
                line-height: 50px;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                color: #000;
                font-weight: normal;
            }
            .list {
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                color: $topAndNavColor;
                .title {
                    overflow: hidden;
                    >li {
                        height: 28px;
                        line-height: 28px;
                        margin-left: 36px;
                        float: left;
                    }
                    >li:nth-of-type(1) {
                        width: 378px;
                    }
                    >li:nth-of-type(2) {
                        width: 186px;
                        text-align: center;
                    }
                    >li:nth-of-type(3) {
                        width: 120px;
                        text-align: center;
                    }
                    >li:nth-of-type(4) {
                        width: 178px;
                        text-align: center;
                    }
                    >li:nth-of-type(5) {
                        width: 109px;
                        text-align: center;
                    }
                }
                .pro_list {
                    width: 100%;
                    li {
                        border: 1px solid #BFBFBF;
                        overflow: hidden;
                        width: calc(100% - 2px);
                        margin: 0 0 21px 0;
                        padding: 21px 0;
                        div:first-child {
                            margin-left: 36px;
                            width: 378px;
                            float: left;
                            >a {
                                float: left;
                                display: block;
                                width: 112px;
                                height: 112px;
                                border: 1px solid $topAndFooterBgColor;
                                >img {
                                    display: block;
                                    width: 100%;
                                }
                            }
                            >div {
                                float: left;
                                width: 237px;
                                margin-left: 20px;
                                >a {
                                    line-height: 23px;
                                    display: block;
                                    margin-bottom: 24px;
                                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                                    color: $topAndNavColor;
                                }
                                >p {
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
                        >span {
                            display: block;
                            width: 186px;
                            float: left;
                            margin-left: 36px;
                            text-align: center;
                            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                            color: $topAndNavColor;
                        }
                        >span:nth-of-type(2) {
                            width: 120px;
                        }
                        >span:nth-of-type(3) {
                            width: 178px;
                        }
                        >span:nth-of-type(4) {
                            width: 109px;
                            a {
                                display: block;
                                line-height: 25px;
                                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                                color: #1d8298;
                            }
                            a:first-of-type {
                                color: $topAndNavColor;
                            }
                        }
                    }
                }
            }
            .result {
                margin: 2px 20px 21px 0;
                float: right;
                min-width: 170px;
                >div {
                    overflow: hidden;
                    line-height: 25px;
                    color: $topAndNavColor;
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    >h6 {
                        float: left;
                        font-weight: normal;
                        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    }
                    >span {
                        float: right;
                        text-align: right;
                    }
                }
                .all_price {
                    color: $activeBgColor;
                    >span {
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>
