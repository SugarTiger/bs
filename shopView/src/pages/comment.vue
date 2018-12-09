<template>
  <div id="comment">
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
                <router-link to="comment">商品评价</router-link>
            </li>
        </ul>
        <div class="containe">
            <h2>商品评价</h2>
            <ul class="title">
                <li>商品</li>
                <li>商品编号</li>
                <li>容量</li>
                <li>颜色</li>
                <li>评价状态</li>
            </ul>
            <ul class="pro_list">
                <li>
                    <div>
                        <router-link :to="{name:'pro_details',query:{proId:proD.goods_id}}">
                            <img :src="imgServer+proD.goods_img[0]" alt="">
                        </router-link>
                        <div>
                            <router-link :to="{name:'pro_details',query:{proId:proD.goods_id}}">{{proD.goods_name}}</router-link>
                            <p><img src="../assets/images/7_icon.png" alt="">支持7天无理由退货</p>
                            <p><img src="../assets/images/bao_icon.png" alt="">选廷保</p>
                        </div>
                    </div>
                    <span>{{proD.goods_id}}</span>
                    <span>{{proD.goods_capacity}}</span>
                    <span>{{proD.goods_color}}</span>
                    <span><a href="#edit_com">发表评价</a></span>
                </li>
            </ul>
            <div id="edit_com" class="edit_com">
                <div>
                    <div class="grading">
                        <label><span>*</span>评分：</label>
                        <div class="describe">
                            <h6>商品评分</h6>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            <input type="hidden" value='0' name="describe" id="fff"/>
                        </div>
                    </div>
                    <div class="com_txt">
                        <label><span>*</span>详细说明：</label>
                        <textarea name="com_txt" v-model='commentText' placeholder="请输入详细评论！"></textarea>
                    </div>
                    <span>10-500字</span>
                    <input type="submit" value="提交评价" class="sub" @click="onSubmit" />
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import topBody from "@/components/topBody";
import navTab from "@/components/navTab";
import { imgServer } from "@/utils/config";
// 评分
    function setgrade(obj, type, seleobj, inputname) {
        obj[type](function () {
            var x = $(this).index();
            if (type == 'click') {
                seleobj.off('mouseenter');
                seleobj.off('mouseleave');
                $("input[name=" + inputname + "]").attr('value', x + 1);
            }
            seleobj.each(function (index) {
                if (index > x) {
                    $(this).css('background-image', 'url(images/kx_icon.png)');
                } else {
                    $(this).css('background-image', 'url(images/hx_icon.png)');
                }
            });
        });
    }
export default {
  components: {
    topBody,
    navTab
  },
  data(){
    return {
      proD: {
            goods_img: []
        },
        imgServer: imgServer,
        commentText: '',
        proId:0,
        orderId:0
    }
  },
  mounted: function () {
        var proId = this.$route.query.proId;
        var orderId = this.$route.query.orderId;
        if (!proId||!orderId) {
            this.$router.push({name:'shop_list'})
            return;
        }
        this.proId = proId
        this.orderId = orderId
        this.getProInfo(proId);
        // jq
        $('.describe>ul>li').each(function () {
            setgrade($(this), 'mouseenter', $('.describe>ul>li'));
            setgrade($(this), 'click', $('.describe>ul>li'), 'describe');
            $('.describe>ul>li').mouseleave(function () {
                $('.describe>ul>li').css('background-image', 'url(images/kx_icon.png)');
            });
        });
    },
    methods: {
        getProInfo: function (proId) {
            var that = this;
            this.$api.get('/public/getProDetail', {
                proId: proId
            }, function (res) {
                that.proD = res.data.items
            });
        },
        onSubmit: function () {
            var f = Number($("#fff").val());
            if (f === 0) {
                this.$alert('评分不能有0分哦！');
                return;
            }
            var strlen = this.commentText.length;
            if (strlen < 10) {
                this.$alert('详细说明至少10个字哦！');
                return false;
            } else if (strlen > 500) {
                this.$alert('详细说明不能超过500个字哦！');
                return false;
            }
            // 提交商品评论
            this.$api.post('/writeProComment',{
                goods_id:this.proId,
                comment_content:this.commentText,
                comment_fraction:f,
                orderId:this.orderId
            },(res)=>{
                this.$alert("评论成功", "成功提示", {
                  confirmButtonText: "返回订单列表",
                  type: "success",
                  callback: action => {
                    if(action === 'confirm'){
                      this.$router.push({name:'order'})
                    }
                  }
                });
            })
            console.log(this.commentText, $("#fff").val())
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#comment {
  background-color: #fff;
}
.containe {
        >h2 {
            height: 40px;
            line-height: 40px;
            padding-left: 37px;
            width: calc(100% - 37px);
            background-color: $proBottomBgColor;
            font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
            color: #000;
        }
        .title {
            height: 35px;
            width: 100%;
            li {
                line-height: 35px;
                float: left;
                font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                color: $topAndNavColor;
                margin-left: 10px;
            }
            li:nth-child(n) {
                width: 165px;
                text-align: center;
            }
            li:first-of-type {
                width: 372px;
                text-align: left;
                margin-left: 36px;
            }
        }
        .pro_list {
            display: block;
            border: 1px solid #BFBFBF;
            width: calc(100% - 2px);
            margin-bottom: 70px;
            li {
                overflow: hidden;
                margin: 21px 0;
                div:first-child {
                    margin-left: 36px;
                    width: 372px;
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
                    width: 165px;
                    float: left;
                    margin-left: 10px;
                    text-align: center;
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    color: $topAndNavColor;
                    a {
                        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                        color: #1d8298;
                    }
                }
            }
        }
        .summary {
            border-top: 1px solid $activeBgColor;
            position: relative;
            width: calc(100% - 17px);
            padding: 20px 0 23px 17px;
            ;
            background-color: $proBottomBgColor;
            >h3 {
                position: absolute;
                width: 165px;
                height: 40px;
                line-height: 40px;
                border-bottom: 3px solid $activeBgColor;
                text-align: center;
                font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                color: #000;
                left: 0;
                top: -42px;
            }
            .grade {
                border: 1px solid #aaa;
                width: 88px;
                height: 134px;
                margin-right: 11px;
                float: left;
                width: 133px;
                text-align: center;
                >h5 {
                    font-weight: normal;
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    color: #333;
                    margin-top: 38px;
                }
                >span {
                    font-weight: bold;
                    font-size: 40px;
                    color: $activeBgColor;
                    display: block;
                    i {
                        font-style: normal;
                        font-size: 24px;
                        font-weight: normal;
                    }
                }
            }
            >ul {
                overflow: hidden;
                float: left;
                width: 789px;
                margin-top: 19px;
                li {
                    float: left;
                    margin: 5px 5px 5px 0;
                    border: 1px solid $topAndFooterBgColor;
                    height: 20px;
                    line-height: 20px;
                    background-color: #fff;
                    >a {
                        padding: 0 10px;
                        color: #999;
                        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    }
                }
            }
        }
        .summary:after {
            clear: both;
            content: '';
            display: block;
        }
        .edit_com {
            width: calc(100% - 356px);
            background-color: #FDFAF4;
            border: 1px solid #BFBFBF;
            padding: 45px 178px 36px 178px;
            color: $topAndNavColor;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            margin-bottom: 33px;
            >div {
                overflow: hidden;
                label {
                    span {
                        color: $activeBgColor;
                        margin-right: 9px;
                    }
                }
                .grading {
                    width: 245px;
                    overflow: hidden;
                    >label {
                        float: left;
                    }
                    .describe,
                    .mer_serve,
                    .log_serve {
                        width: 178px;
                        float: right;
                        overflow: hidden;
                        height: 25px;
                        h6 {
                            font-weight: normal;
                            float: left;
                            text-align: right;
                            width: 70px;
                            line-height: 18px;
                        }
                        ul {
                            overflow: hidden;
                            float: right;
                            li {
                                float: left;
                                width: 18px;
                                height: 18px;
                                margin: 0 1px;
                                background-image: url(../assets/images/kx_icon.png);
                                background-position: top;
                                background-repeat: no-repeat;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .com_txt {
                    width: 841px;
                    label {
                        vertical-align: top;
                        span {
                            vertical-align: top;
                        }
                    }
                    textarea {
                        border: 1px solid #BFBFBF;
                        width: 744px;
                        height: 149px;
                        padding-left: 5px;
                        resize: none;
                        color: $topAndNavColor;
                        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                        outline: none;
                    }
                }
                >span {
                    display: block;
                    width: calc(100% - 9px);
                    text-align: right;
                    margin-top: 5px;
                    height: 38px;
                    line-height: 38px;
                    padding-right: 9px;
                }
                .sub {
                    display: block;
                    color: #fff;
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    font-weight: bold;
                    width: 102px;
                    height: 31px;
                    background-color: $activeBgColor;
                    text-align: center;
                    line-height: 31px;
                    border-radius:5px;
                    float: right;
                    margin-right: 9px;
                    cursor: pointer;
                }
            }
        }
    }
</style>

