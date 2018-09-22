<template>
  <div class="wrapper" id="wrapper">
            <div class="banner">
                <ul>
                    <li v-for="(item,i) in bannerList" :key="i">
                        <router-link :to="{name:'pro_details',query:{proId:item.proId}}">
                          <img :src="item.imgUrl" />
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
// 公共图片baseUrl
export default {
  data(){
    return {
      info_banner_time: 3000,
    }
  },
  computed:{
    bannerList(){
      this.info_banner_time = (this.$store.state.shopInfo.info_banner_time * 1000) || 3000;
      return this.$store.state.shopInfo.bannerList||[];
    }
  },
  mounted(){
    this.$nextTick(this.initBanner);
  },
  methods:{
    initBanner() {
            var that = this;
            // 轮播图js
            // 添加焦点和左右箭头
            function addOl(banner) {
                var liImgs = $("." + banner).find("ul").find("li");
                var ol = $("<ol></ol>");
                liImgs.each(function (i) {
                    ol.append($("<li/>"));
                });
                $("." + banner).append(ol);
                $(".banner ol li").eq(0).addClass("active");
            };

            function active() {
                $(".banner ol li").eq(i).addClass("active").siblings().removeClass("active");
                $(".banner ul li").eq(i).fadeIn(800).siblings().fadeOut(800);
            }
            // 后退
            function moveL() {
                i--;
                if (i == -1) {
                    i = size - 1;
                }
                active();
            }
            // 前进
            function moveR() {
                i++;
                if (i == size) {
                    i = 0;
                }
                active();
            }
            addOl("banner");
            var i = 0;
            var size = $(".banner ol li").length;
            // 绑定左右控制
            $("#left").click(function () {
                moveL();
            });
            $("#right").click(function () {
                moveR();
            });
            // 自动轮播
            var info_banner_time = that.info_banner_time
            var autoMove = setInterval(moveR, info_banner_time);
            $(".banner").hover(function () {
                clearInterval(autoMove);
                $("#left").show();
                $("#right").show();
            }, function () {
                autoMove = setInterval(moveR, info_banner_time);
                $("#left").hide();
                $("#right").hide();
            });
            // 焦点点击
            $(".banner ol li").click(function () {
                i = $(this).index();
                active();
            });
            // 控制轮播图的位置
            function bannerxy() {
                var dw = document.documentElement.clientWidth;
                var leftpx = -(1920 - dw) / 2 + 'px';
                $('.banner').css('left', leftpx);
            };
            bannerxy();
            $(window).resize(bannerxy);
        }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variable.scss';
.imgblock {
    display: block;
}
.wrapper {
        height: 600px;
        width: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
        // margin-bottom: 100px;
        .banner {
            width: 1920px;
            position: absolute;
            ul {
                z-index: 2;
                position: relative;
                li {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: none;
                }
                li:first-child {
                    display: block;
                }
            }
            img {
                width: 100%;
                @extend .imgblock;
            }
            ol {
                position: absolute;
                width: 75px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                top: 570px;
                margin: 0 auto;
                z-index: 2;
                li {
                    list-style: none;
                    width: 15px;
                    height: 15px;
                    margin: 0 5px;
                    float: left;
                    -webkit-border-radius: 15px;
                    -moz-border-radius: 15px;
                    -ms-border-radius: 15px;
                    -o-border-radius: 15px;
                    border-radius: 15px;
                    background-color: #999999;
                    cursor: pointer;
                }
                li:hover,
                li.active {
                    background-color: $activeBgColor;
                }
            }
        }
    }
</style>
