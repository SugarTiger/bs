<template>
  <div id="pay">
    <topBody/>
    <navTab/>
    <ul class="crumbs">
            <li>
                <router-link to="index">首页</router-link>
            </li>
            <li> > </li>
            <li>
                <router-link to="shop_cart">我的购物车</router-link>
            </li>
            <li> > </li>
            <li>
                <a href="javascript:void(0)">确认支付</a>
            </li>
        </ul>
        <div class="containe">
            <div class="order_info">
                <div class="thead">
                    <div class="note">
                        <h3>订单提交成功，请尽快付款！订单号：<span>{{orderId}}</span></h3>
                    </div>
                    <div class="msg">
                        <span class="money">应付金额：<em>{{orderInfo.order_total_price}}</em> 元</span>
                        <span>收起详情</span>
                    </div>
                </div>
                <ul class="details">
                    <li>
                        <h4>收货地址：</h4><span>{{orderInfo.address}}</span></li>
                    <li>
                        <h4>收货人：</h4><span>{{orderInfo.receiver}} {{orderInfo.phone}}</span></li>
                    <li class="pro_info">
                        <h4>商品名称：</h4>
                        <ul>
                            <li v-for="(pro,i) in orderInfo.proList" :key="i">{{pro.goods_name}} {{pro.goods_capacity}} {{pro.goods_color}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="wd_pay">
                <h2>文的支付</h2>
                <ul class="pay_list">
                    <li class="active">
                        <div class="checkbox">
                            <span class="checked"></span>
                            <input type="radio" name="pay" value="0"  checked='checked'>
                        </div>
                        <span class="bank_name"><img src="../assets/images/js_icon.png" alt="">余额支付</span>
                        <span class="card">余额为：4665 元</span>
                        <span class="max">单笔限额1万</span>
                        <em>优惠</em>
                        <span class="highest">随机减最高999</span>
                    </li>
                </ul>
                <form class="paying" v-on:submit.prevent="paying">
                    <label for="pay_pwd">请输入6位数字支付密码</label>
                    <div>
                        <div class="pwd">
                            <input type="password" maxlength="1" id="pay_pwd">
                            <input type="password" maxlength="1" readonly>
                            <input type="password" maxlength="1" readonly>
                            <input type="password" maxlength="1" readonly>
                            <input type="password" maxlength="1" readonly>
                            <input type="password" maxlength="1" readonly>
                        </div>
                    </div>
                    <input type="submit" value="立即支付" >
                </form>
            </div>
            <div class="pay_style">
                <h2>其它支付</h2>
                <ul>
                    <li><a href="javascript:void(0)">微信支付</a></li>
                    <li><a href="javascript:void(0)">支付宝支付</a></li>
                    <li><a href="javascript:void(0)">中国银联</a></li>
                    <li><a href="javascript:void(0)">预付卡支付</a></li>
                </ul>
            </div>
        </div>
  </div>
</template>

<script>
import topBody from "@/components/topBody";
import navTab from "@/components/navTab";
const md5 = require('md5');
function removeFalse(obj) {
    obj.removeClass('active');
    obj.find('.checkbox>input')[0].checked = false;
    obj.find('.checkbox>span').removeClass('checked');
}
export default {
  components: {
    topBody,
    navTab
  },
  data(){
    return {
      orderId:'',
        orderInfo:{},
        balance:0
    }
  },
  mounted(){
    this.getOrderInfo();
        var that = this;
        this.$api.get('/getUserInfo',null,function(res){
            that.balance = res.data.userInfo.user_balance
        })
    // 收起详情
    $('.msg>span:last').click(function () {
        $('.details').slideToggle(100);
    });
    // 选择支付方式
    $('.pay_list>li').click(function () {
        var radio = $(this).find('input');
        if (!radio[0].checked) {
            $(this).addClass('active');
            radio[0].checked = true;
            $(this).find('span').addClass('checked');
            removeFalse($(this).siblings());
        }
    });
    // 选择优惠
    $('.highest').click(function (event) {
        event.stopPropagation();
        var ul = $(this).parent().find('ul');
        ul.slideToggle(100);
    });
    $('.fav_list li').click(function () {
        var thisHighest = $(this).parent().prev();
        thisHighest.text($(this).html());
        thisHighest.trigger("click")
    });
    // 点击获得焦点
    $('.pwd>input').click(function () {
        var notempty = $('.pwd>input[value!=""]');
        if (notempty.length === 0) {
            $('#pay_pwd').focus();
        } else if (notempty.length === 6) {
            notempty.last().focus();
        } else {
            notempty.last().next().focus();
        }
    });
    // 输入密码时自动下一位,不能输入除数字外的键
    $('.paying input[type="password"]').keyup(function (event) {
        var gg = $(this).val();
        var keycode = event.keyCode || event.which;
        if (keycode === 8) {
            if ($(this).index() !== 0) {
                $(this).attr({
                    'value': '',
                    'readonly': true
                }).prev().attr('readonly', false).focus();
            }
        } else if (keycode >= 48 && keycode <= 57 || keycode >= 96 && keycode <= 105) {
            if ($(this).index() !== 5 && $(this).val() !== '') {
                $(this).attr('readonly', true).next().attr('readonly', false).focus();
            } else {
                $(this).blur();
            }
        }
    });
    $('.paying input[type="password"]').on('input', function () {
        if (!/[0-9]/.test($(this).val())) {
            this.value = '';
        }
    });
  },
  methods: {
        getOrderInfo: function () {
            var orderId = this.$route.query.orderId
            if (!orderId) {
                history.back();
                return;
            }
            var that = this;
            this.orderId = orderId;
            this.$api.get('/getOrderDetail',{
                orderId:orderId
            },function(res){
                that.orderInfo = res.data;
            })
        },
        paying: function () {
            var notempt = true;
            var pwd = '';
            var that = this;
            $('.pwd input[type="password"]').each(function () {
                var val = $(this).val();
                if (val === '') {
                    that.$message.error('支付密码不能有空！');
                    notempt = false;
                    return false;
                }
                pwd += val;
            });
            if(!notempt)return;
            if(this.balance<this.orderInfo.order_total_price){
                that.$message.error('余额不足，请联系客服充值！');
                return;
            }
            this.$api.post('/userPayOrder',{
                orderId:this.orderId,
                payPwd:md5(pwd)
            },function(res){
                if(res.status===1){
                    that.$router.replace({
                      name:'pay_success',
                      query:{
                        orderProce:res.data.totalMoney,
                        orderId:that.orderInfo.order_id,
                        money:res.data.money
                      }
                    })
                    return;
                }else if(res.status===2){
                    that.$message.error('余额不足，请联系客服充值！');
                    return;
                } else if(res.status === 3){
                    that.$message.error('支付密码错误！');
                    return;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#pay {
  background-color: #fff;
}
.containe {
        width: 100%;
        background-color: $proBottomBgColor;
        padding-bottom: 64px;
        .order_info {
            width: 1140px;
            margin: 0 auto;
            .thead {
                width: calc(100% - 24px);
                overflow: hidden;
                padding: 30px 12px;
                color: $topAndNavColor;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                .note {
                    float: left;
                    >h3 {
                        line-height: 25px;
                        float: left;
                        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                        >span {
                            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                        }
                    }
                    >p {
                        line-height: 25px;
                        float: left;
                        clear: both;
                    }
                }
                .msg {
                    float: right;
                    .money {
                        line-height: 25px;
                        display: block;
                        >em {
                            text-align: right;
                            font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                            font-weight: bold;
                            color: $activeBgColor;
                            font-style: normal;
                        }
                    }
                    >span:last-of-type {
                        line-height: 25px;
                        display: block;
                        text-align: right;
                        color: #1d8298;
                        padding-right: 15px;
                        background: url(../assets/images/arrows_icon5.png) no-repeat right center;
                        cursor: pointer;
                    }
                }
            }
            .details {
                width: calc(100% - 12px);
                border-top: 1px solid #C9C9C9;
                color: $topAndNavColor;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                padding: 16px 0 0 12px;
                >li {
                    line-height: 25px;
                    >h4 {
                        color: $topAndNavColor;
                        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                        font-weight: normal;
                        float: left;
                        width: 85px;
                    }
                }
                .pro_info {
                    overflow: hidden;
                    >ul {
                        float: left;
                    }
                }
            }
        }
        .wd_pay {
            margin: 85px auto 32px auto;
            width: 1140px;
            padding: 92px 30px 49px 30px;
            position: relative;
            background-color: #fff;
            -webkit-box-shadow: 0px 0px 30px #D8D8D8;
            -moz-box-shadow: 0px 0px 30px #D8D8D8;
            -o-box-shadow: 0px 0px 30px #D8D8D8;
            box-shadow: 0px 0px 30px #D8D8D8;
            >h2 {
                font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                color: #fff;
                text-align: center;
                width: 140px;
                height: 41px;
                line-height: 35px;
                background: url(../assets/images/pay_bg.png) no-repeat;
                position: absolute;
                top: 11px;
                left: -5px;
            }
            .pay_list {
                padding-bottom: 14px;
                >li {
                    line-height: 55px;
                    height: 55px;
                    color: #5a5a5a;
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    border: 1px solid #C9C9C9;
                    border-bottom: none;
                    position: relative;
                    cursor: pointer;
                    .checkbox {
                        width: 21px;
                        height: 21px;
                        float: left;
                        margin: 0 31px 0 13px;
                        cursor: pointer;
                        margin-top: 18px;
                        >span {
                            display: block;
                            width: 21px;
                            height: 21px;
                            background: url(../assets/images/checkbox_false3.png) no-repeat center;
                        }
                        >input {
                            display: none;
                        }
                        .checked {
                            background: url(../assets/images/checkbox_true3.png) no-repeat center;
                        }
                    }
                    .bank_name {
                        float: left;
                        padding: 0 70px 0 0;
                        >img {
                            vertical-align: top;
                            margin-right: 14px;
                            margin-top: 15px;
                        }
                    }
                    .card {
                        float: left;
                        padding-right: 37px;
                    }
                    .max {
                        float: left;
                        margin-right: 4px;
                    }
                    >em {
                        font-style: normal;
                        float: left;
                        width: 36px;
                        height: 23px;
                        background-color: #637fbe;
                        color: #fff;
                        border-radius:3px;
                        margin: 16px 4px 0 4px;
                        line-height: 23px;
                        text-align: center;
                    }
                    .highest {
                        color: #637fbe;
                        background: url(../assets/images/arrows_icon7.png) no-repeat right center;
                        padding-right: 12px;
                        cursor: pointer;
                    }
                    .fav_list {
                        padding-right: 12px;
                        position: absolute;
                        top: 38px;
                        left: 494px;
                        background-color: #fff;
                        z-index: 99;
                        border: 1px solid #C9C9C9;
                        display: none;
                        >li {
                            color: #637fbe;
                            line-height: 20px;
                            cursor: pointer;
                        }
                    }
                }
                >li:last-of-type {
                    border-bottom: 1px solid #C9C9C9;
                }
                .active {
                    >em {
                        background-color: $activeBgColor;
                    }
                    .highest {
                        color: $activeBgColor;
                        background: url(../assets/images/arrows_icon6.png) no-repeat right center;
                    }
                    >ul {
                        >li {
                            color: $activeBgColor;
                        }
                    }
                }
            }
            .add_card {
                display: block;
                width: 158px;
                height: 31px;
                border: 1px solid #C9C9C9;
                color: #1d8298;
                line-height: 31px;
                text-align: center;
                margin-left: 66px;
            }
            .paying {
                margin-left: 66px;
                >label {
                    color: $topAndNavColor;
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                }
                >div {
                    margin: 10px 0 0 5px;
                    overflow: hidden;
                    .pwd {
                        width: 215px;
                        height: 34px;
                        border: 1px solid #C9C9C9;
                        float: left;
                        cursor: text;
                        >input {
                            background-color: #fff;
                            width: 35px;
                            height: 24px;
                            float: left;
                            border-left: 1px solid #C9C9C9;
                            text-align: center;
                            line-height: 24px;
                            margin-top: 5px;
                            color: $topAndNavColor;
                            font-size: 20px;
                            cursor: text;
                        }
                        >input:first-of-type {
                            border-left: none;
                        }
                    }
                    >a {
                        color: #1d8298;
                        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                        float: left;
                        line-height: 36px;
                        margin-left: 13px;
                    }
                }
                >input[type=submit] {
                    text-align: center;
                    width: 196px;
                    height: 42px;
                    line-height: 42px;
                    color: #fff;
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    background-color: $activeBgColor;
                    cursor: pointer;
                    font-weight: bold;
                    margin: 10px 0 0 7px;
                }
            }
        }
        .pay_style {
            margin: 32px auto 0 auto;
            width: 1155px;
            padding: 69px 0 14px 45px;
            position: relative;
            background-color: #fff;
            -webkit-box-shadow: 0px 0px 30px #D8D8D8;
            -moz-box-shadow: 0px 0px 30px #D8D8D8;
            -o-box-shadow: 0px 0px 30px #D8D8D8;
            box-shadow: 0px 0px 30px #D8D8D8;
            >h2 {
                font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                color: #fff;
                text-align: center;
                width: 106px;
                height: 31px;
                line-height: 28px;
                background: url(../assets/images/pay_bg2.png) no-repeat;
                position: absolute;
                top: 10px;
                left: -5px;
            }
            >ul {
                overflow: hidden;
                >li {
                    float: left;
                    padding: 0 13px;
                    border-right: 1px solid $topAndNavColor;
                    line-height: 15px;
                    a {
                        color: $topAndNavColor;
                        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                        vertical-align: text-top;
                    }
                }
                >li:last-of-type {
                    border-right: none;
                }
            }
        }
    }
</style>
