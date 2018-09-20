<template>
  <div id="footer">
        <ul class="footer_head">
            <li>
                <a href="#"><img src="../assets/images/b_icon1.png" alt=""></a>
                <h4><a href="#">正品保障</a></h4><br/>
                <span><a href="#">正品保障，提供发票</a></span>
            </li>
            <li>
                <a href="#"><img src="../assets/images/b_icon2.png" alt=""></a>
                <h4><a href="#">急速物流</a></h4><br/>
                <span><a href="#">急速物流，急速送达</a></span>
            </li>
            <li>
                <a href="#"><img src="../assets/images/b_icon3.png" alt=""></a>
                <h4><a href="#">无忧售后</a></h4><br/>
                <span><a href="#">七天无理由退换货</a></span>
            </li>
            <li>
                <a href="#"><img src="../assets/images/b_icon4.png" alt=""></a>
                <h4><a href="#">特色服务</a></h4><br/>
                <span><a href="#">为您呈现不一样的服务</a></span>
            </li>
            <li>
                <a href="#"><img src="../assets/images/b_icon5.png" alt=""></a>
                <h4><a href="#">帮助中心</a></h4><br/>
                <span><a href="#">你的购物管家</a></span>
            </li>
        </ul>
        <div class="copyright" id="fcopyright">
            <p class="containe">
                {{footerText}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      footerText:'特特手术台上的天上的天使道听途说特殊的'
    }
  }
}
</script>

<style lang="scss">
$topFontFamily:SimSun;
$topAndFooterBgColor:#d2d2d2;
$navClassifyLiAndproSpanAndDlAndTimeFontSize:14px;
$proH4AndbottomH4AndDtAndServiceFontSize:16px;
$bottomColor:#d4d4d4;
$telFontSize:36px;
.containe {
    width: 1200px;
    margin: 0 auto;
}
#footer {
    background-color: #000;
    width: 100%;
    height: 155px;
    .footer_head {
        @extend .containe;
        height: 72px;
        border-bottom: 1px solid $topAndFooterBgColor;
        margin-bottom: 32px;
        li {
            float: left;
            height: 72px;
            width: 217px;
            margin-left: 21px;
            a {
                color: $bottomColor;
            }
            * {
                float: left;
            }
            img {
                margin-top: 13px;
                margin-right: 8px;
            }
            h4 {
                margin-top: 15px;
                margin-bottom: 3px;
                a {
                    font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                }
            }
            span {
                a {
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                }
            }
        }
        li:last-of-type {
            width: 200px;
        }
    }
    .footer_main {
        @extend .containe;
        overflow: hidden;
        height: 190px;
        dt,
        a,
        span,
        small {
            color: $bottomColor;
        }
        dl {
            float: left;
            margin: 0 77px 0 22px;
        }
        dl:last-of-type {
            margin-right: 0;
        }
        dt {
            font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
            font-weight: bold;
        }
        dd {
            margin: 4px 0;
        }
        a {
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        }
        >div {
            float: right;
            margin-right: 73px;
            width: 244px;
            * {
                display: block;
            }
            .tel {
                font-size: $telFontSize;
            }
            small {
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                text-align: center;
                margin: 23px auto;
            }
            a {
                width: 224px;
                height: 35px;
                border: 2px solid $bottomColor;
                font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                font-weight: bold;
                line-height: 35px;
                margin: 0 auto;
                img {
                    float: left;
                    margin: 7px 14px 0 31px;
                }
            }
        }
    }
    .copyright {
        width: 100%;
        height: 50px;
        background-color: $topAndFooterBgColor;
        p {
            line-height: 50px;
            text-align: center;
            font-family: $topFontFamily;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: #010101;
        }
    }
}
</style>
