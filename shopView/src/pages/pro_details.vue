<template>
<div id="proD">
    <topBody/>
    <navTab/>
  <div class="containe">
    <ul class="crumbs"></ul>
            <div class="section_top">
                <div class="pro_img">
                    <div class="img_box">
                        <img :src="imgServer+proD.goods_img[0]" alt="">
                        <div class="zoom"></div>
                    </div>
                    <div class="bigimg">
                        <img src="" alt="">
                    </div>
                    <div class="img_wrap">
                        <ul>
                            <li :class="{active:i===0}" v-for="(imgUrl,i) in proD.goods_img" :key="i">
                                <img :src="imgServer+imgUrl">
                            </li>
                        </ul>
                        <span class="prev"></span>
                        <span class="next"></span>
                    </div>
                </div>
                <div class="details">
                    <h2>微动 {{proD.goods_type}} {{proD.goods_name}}</h2>
                    <p>美好生活，从微动开始</p>
                    <div class="price">
                        <p>
                            <small>市场价</small>
                            <span>￥{{proD.goods_marketPrice}}</span>
                        </p>
                        <p>
                            <small>促销价</small>
                            <span>
                                <em>￥</em>{{proD.goods_price}}</span>
                        </p>
                    </div>
                    <ul>
                        <!-- <li>月销量：<span>325</span></li> -->
                        <li>累计销量：
                            <span>{{proD.goods_sales}}</span>
                        </li>
                        <li>库存剩余：
                            <span>{{proD.goods_inventory}}</span>
                        </li>
                        <li>微动积分：
                            <span>{{proD.goods_integral}}</span>
                        </li>
                    </ul>
                    <div class="color">
                        <h3>颜色分类</h3>
                        <ul>
                            <li>
                                <img :src="imgServer+proD.goods_img[0]" alt="">
                            </li>
                        </ul>
                    </div>
                    <div class="count">
                        <h3>数量</h3>
                        <input id="count" type="text" value="1">
                        <span>
                            <button class="add">+</button>
                            <button class="down">-</button>
                        </span>
                    </div>
                    <div class="shopping">
                        <a @click="toSubOrder(proD.goods_id)">立即购买</a>
                        <a @click="addshopcart(proD.goods_id)" class="shoppingcart">加入购物车</a>
                        <a href="javascript:void(0)" class="add_love" @click="setLove">
                            <img src="../assets/images/love_icon2.png" alt="" v-if="isLove">
                            <img src="../assets/images/love_icon.png" alt="" v-else>
                            加入收藏</a>
                    </div>
                    <div class="service">
                        <h3>服务承诺</h3>
                        <ul>
                            <li>全国联保</li>
                            <li>正品保证</li>
                            <li>只换不修</li>
                            <li>T2极速退款</li>
                            <li>赠运费险</li>
                            <li>七天无理由退换</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="shop_area">
                <form class="shop_search">
                </form>
                <ul>
                    <li class="active">
                        <a href="javascript:void(0)">商品详情</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">累计评论（{{commontList.length}}）</a>
                    </li>
                </ul>
            </div>
            <div class="section_bottom">
                <div class="sidebar">
                    <div class="hot_ad">
                        <h3>微动热销</h3>
                        <ul>
                            <li v-for="(pro,index) in hostList" :key="index">
                                <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}
                                ">
                                <img :src="imgServer+pro.goods_img[0]" alt="">
                                </router-link>
                                <p>
                                    <em>{{index+1}}</em>热销{{pro.goods_sales}}件
                                    <span>￥{{pro.goods_price}}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="com_main">
                    <h3>商品评价</h3>
                    <div class="summary" v-if="commontList.length!==0">
                        <div class="grade">
                            <h5>好评度</h5>
                            <span>{{percen}}
                                <i>%</i>
                            </span>
                        </div>
                        <ul>
                            <li>
                                <a href="javascript:void(0)">电饭煲不错</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">外观漂亮</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">内胆不错</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">煮饭速度快</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">煮的饭很香</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">一般</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">功能多</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">使用方便</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">预约功能</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">还可以吧</a>
                            </li>
                        </ul>
                    </div>
                    <ul class="sort" v-if="commontList.length!==0">
                        <li>
                            <a href="javascript:void(0)">推荐排序
                                <img src="../assets/images/arrows_icon3.png" alt="">
                            </a>
                            <ul>
                                <li @click="commSortTime">时间排序</li>
                                <li @click="commSortData">评分排序</li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="estimate" v-if="commontList.length!==0">
                        <li v-for="(item ,i) in commontList" :key="i">
                            <div class="user_info">
                                <img :src="imgServer+item.user_headurl" alt="">
                                <span>{{item.user_name}}</span>
                                <!-- <p>钻石会员</p> -->
                            </div>
                            <div class="estimate_main">
                                <div class="ori_estimate">
                                    <ul>
                                        <li v-for="(n,j) in item.comment_fraction" :key="j"></li>
                                    </ul>
                                    <p>{{item.comment_content}}</p>
                                    <span>{{proD.goods_name}} {{proD.goods_color}} {{item.comment_date}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="page" v-else>
                        此商品暂无评论
                    </div>
                </div>
                <div class="pro_main">
                    <div class="details" v-html="proD.goods_details">
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
function zoom(scale) {
  //scale控制缩放比例的产量
  var img_boxW = $(".img_box").innerWidth();
  var img_boxH = $(".img_box").innerHeight();
  var imgOffT = $(".img_box>img").offset().top;
  var imgOffL = $(".img_box>img").offset().left;
  // 配置放大镜镜片大小
  var zoomW = $(".zoom")
    .css("width", img_boxW / scale + "px")
    .innerWidth();
  var zoomH = $(".zoom")
    .css("height", img_boxH / scale + "px")
    .innerHeight();
  // 设置放大镜窗口大小
  $(".bigimg").css("width", img_boxW + "px");
  $(".bigimg").css("height", img_boxH + "px");
  $(".bigimg>img").css("width", img_boxW * scale + "px");
  $(".bigimg>img").css("height", img_boxH * scale + "px");
  $(".img_box").mouseenter(function() {
    $(".bigimg").fadeIn("fast");
    $(".zoom").fadeIn("fast");
  });
  $(".img_box").mouseleave(function() {
    $(".bigimg").fadeOut("fast");
    $(".zoom").fadeOut("fast");
  });
  $(".img_box").mousemove(function(event) {
    $(".bigimg>img").attr("src", $(".img_box>img").attr("src"));
    var dw = event.pageX - imgOffL - zoomW / 2;
    var dh = event.pageY - imgOffT - zoomH / 2;
    if (dw <= 0) {
      dw = 0;
    } else if (dw >= img_boxW - zoomW + 1) {
      dw = img_boxW - zoomW + 1;
    }
    if (dh <= 0) {
      dh = 0;
    } else if (dh >= img_boxH - zoomH) {
      dh = img_boxH - zoomH;
    }
    $(".zoom").css("left", dw + "px");
    $(".zoom").css("top", dh + "px");
    $(".bigimg>img").css("left", -dw * scale + "px");
    $(".bigimg>img").css("top", -dh * scale + "px");
  });
}
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
      proD: {
        goods_img: []
      },
      commontList: [],
      hostList: [],
      percen: 0,
      imgServer,
      isLove: false
    };
  },
  methods: {
    setLove() {
      if (!this.$util.getToken()) {
        this.$alert("请先登录微动商城！", "提示", {
          confirmButtonText: "去登陆",
          type: "warning",
          callback: action => {
            this.$router.push("/login");
          }
        });
        return;
      }
      this.isLove = !this.isLove;
    },
    toSubOrder: function(proId) {
      if (!this.$util.getToken()) {
        this.$alert("请先登录微动商城！", "提示", {
          confirmButtonText: "去登陆",
          type: "warning",
          callback: action => {
            this.$router.push("/login");
          }
        });
        return;
      }
      var orderPro = [
        {
          qty: Number($("#count").val()),
          proId: proId
        }
      ];
      var href = "confirm_order.html?orderPro=" + JSON.stringify(orderPro);
      location.href = href;
    },
    addshopcart: function(proId) {
      if (!this.$util.getToken()) {
        this.$alert("请先登录微动商城！", "提示", {
          confirmButtonText: "去登陆",
          type: "warning",
          callback: action => {
            this.$router.push("/login");
          }
        });
        return;
      }
      this.$api.post(
        "/updateCartPro",
        {
          qty: parseInt($("#count").val()),
          proId: proId,
          type: 1
        },
        res => {
          this.$message({
            message: "成功加入购物车",
            type: "success"
          });
          this.$store.commit("getCartCount");
        }
      );
    },
    getProCommont: function(proId) {
      var that = this;
      this.$api.get(
        "/public/getProComment",
        {
          proId: proId
        },
        function(res) {
          var total = 0,
            sum = 0;
          res.data.forEach(function(item) {
            item.comment_date = new Date(item.comment_date).Format(
              "yyyy-MM-dd"
            );
            sum += item.comment_fraction;
            total += 5;
          });
          that.commontList = res.data;
          that.commonTmpList = res.data;
          that.percen = parseInt(sum / total * 100);
        }
      );
    },
    commSortData: function() {
      var that = this;
      that.commontList = that.commonTmpList;
      that.commontList.sort(function(a, b) {
        return b.comment_fraction - a.comment_fraction;
      });
    },
    commSortTime: function() {
      var that = this;
      that.commontList = that.commonTmpList;
      that.commontList.sort(function(a, b) {
        return (
          new Date(b.comment_date).getTime() -
          new Date(a.comment_date).getTime()
        );
      });
    },
    getHosProList: function() {
      var that = this;
      this.$api.get(
        "/public/getProList",
        {
          status: 1
        },
        function(res) {
          that.hostList = res.data.list
            .sort(function(a, b) {
              return b.goods_sales - a.goods_sales;
            })
            .slice(0, 4);
        }
      );
    }
  },
  mounted: function() {
    var proId = this.$route.query.proId;
    console.log("proId", proId);
    if (!proId) {
      this.$router.replace("/shop_list");
      return;
    }
    var that = this;
    // 获取商品详情
    this.$api.get(
      "/public/getProDetail",
      {
        proId: proId
      },
      function(res) {
        that.proD = res.data.items;
        that.$nextTick(function() {
          // 点击按钮添加商品数量
          $(".add").click(function() {
            var val = parseInt($("#count").val()) + 1;
            if (val > res.data.items.goods_inventory) {
              val = res.data.items.goods_inventory;
            } //最大库存数
            $("#count").attr("value", val);
          });
          $(".down").click(function() {
            var val = parseInt($("#count").val()) - 1;
            if (val < 1) {
              val = 1;
            }
            $("#count").attr("value", val);
          });
          $("#count").on("input", function() {
            this.value = this.value.replace(/[^0-9]/g, "");
            if (this.value === "" || parseInt(this.value) === 0) {
              this.value = 1;
            } else if (this.value > res.data.items.goods_inventory) {
              this.value = res.data.items.goods_inventory;
            } //最大库存数
          });
          zoom(2);
          // 商品详情图片
          function getSrc() {
            var src = "";
            $(".img_wrap ul li").each(function() {
              if ($(this).hasClass("active")) {
                src = $(this)
                  .find("img")
                  .attr("src");
                return false;
              }
            });
            return src;
          }

          function setActive(obj) {
            obj
              .addClass("active")
              .siblings()
              .removeClass("active");
          }

          //获取所有的li元素
          var list = $(".img_wrap>ul>li");
          // 每次显示的商品个数
          var pageSize = 4;
          //定义初始页
          var pageInit = 1;
          //定义总页数  向上取整
          var pageTotal = Math.ceil(list.length / pageSize);
          list.each(function() {
            $(this).click(function() {
              setActive($(this));
              $(".img_box img").attr("src", getSrc());
            });
          });

          $(".next").click(function() {
            if (pageInit < pageTotal) {
              //当前页隐藏
              list.slice(pageSize * (pageInit - 1), pageSize * pageInit).hide();
              //下一页显示
              list.slice(pageSize * pageInit, pageSize * (pageInit + 1)).show();
              //为每页首个li元素增加样式
              setActive(list.eq(pageSize * pageInit));
              $(".img_box img").attr("src", getSrc());
              pageInit++;
            }
          });

          $(".prev").click(function() {
            if (pageInit > 1) {
              list.slice(pageSize * (pageInit - 1), pageSize * pageInit).hide();
              list
                .slice(pageSize * (pageInit - 2), pageSize * (pageInit - 1))
                .show();
              setActive(list.eq(pageSize * (pageInit - 2)));
              $(".img_box img").attr("src", getSrc());
              pageInit--;
            }
          });
          // 评论切换
          var pro_main = $(".pro_main,.you_like");
          var com_main = $(".com_main");
          $(".shop_area li").click(function() {
            $(this)
              .addClass("active")
              .siblings()
              .removeClass("active");
            var htmltext = $(this)
              .find("a")
              .text();
            if (htmltext.indexOf("商品详情") > -1) {
              pro_main.css("display", "block");
              com_main.css("display", "none");
            } else if (htmltext.indexOf("累计评论") > -1) {
              pro_main.css("display", "none");
              com_main.css("display", "block");
            }
          });
          $(".color>ul>li").each(function() {
            $(this).click(function() {
              $(this)
                .addClass("active")
                .siblings()
                .removeClass("active");
            });
          });
          // 排序
          (function() {
            var up = true;
            $(".sort>li:last-of-type").click(function() {
              var that = $(this);
              $(this)
                .find("img")
                .attr(
                  "src",
                  up ? "../assets/imagesimages/arrows_icon3_2.png" : "../assets/images/arrows_icon3.png"
                );
              if (up) {
                $(this).attr("class", "on");
              } else {
                setTimeout(function() {
                  that.attr("class", "");
                }, 500);
              }
              $(this)
                .find("ul")
                .slideToggle(500);
              up = !up;
            });
            $(".sort>li:last-of-type>ul>li").click(function() {
              console.log(
                $(".sort>li:last-of-type>a").html(
                  $(this).text() + ' <img src="../assets/images/arrows_icon3.png" alt="">'
                )
              );
            });
          })();
        });
        that.getProCommont(res.data.items.goods_id);
        that.getHosProList();
      }
    );
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#proD {
  width: 100%;
  background-color: #fff;
}
.containe {
}
.section_top {
  overflow: hidden;
  .pro_img {
    width: 473px;
    height: 588px;
    position: relative;
    float: left;
    .img_box {
      width: 100%;
      height: 476px;
      border: 1px solid $topAndFooterBgColor;
      position: relative;
      cursor: crosshair;
      margin-bottom: 24px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .zoom {
        background-color: rgba(185, 175, 175, 0.4);
        position: absolute;
        top: 0;
        display: none;
      }
    }
    .bigimg {
      position: absolute;
      border: 1px solid $topAndFooterBgColor;
      top: 0;
      left: 500px;
      display: none;
      overflow: hidden;
      > img {
        position: absolute;
      }
    }
    .img_wrap {
      width: 100%;
      height: 86px;
      overflow: hidden;
      position: relative;
      ul {
        width: 412px;
        margin: 0 auto;
        overflow: hidden;
        li {
          float: left;
          cursor: pointer;
          width: 85px;
          height: 84px;
          border: 1px solid $topAndFooterBgColor;
          margin: 0 8px;
          img {
            display: block;
            width: 98%;
            margin: 0 auto;
          }
        }
        .active {
          border: 1px solid $activeBgColor;
        }
      }
      .prev,
      .next {
        width: 30px;
        height: 86px;
        display: block;
        position: absolute;
        top: 0;
        cursor: pointer;
      }
      .prev {
        background: url("../assets/images/prev_icon.png") no-repeat center;
      }
      .prev:hover {
        background-image: url(../assets/images/prev_icon_on.png);
      }
      .next {
        right: 0;
        background: url(../assets/images/next_icon.png) no-repeat center;
      }
      .next:hover {
        background-image: url(../assets/images/next_icon_on.png);
      }
    }
  }
  .details {
    width: 697px;
    margin-left: 28px;
    float: left;
    padding-top: 15px;
    > h2 {
      font-size: $navClassifyH3FontSize;
      color: #000;
      margin: 0 0 5px 24px;
    }
    > p {
      color: $activeBgColor;
      font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
      width: 543px;
      line-height: 25px;
      margin-left: 24px;
    }
    .price {
      background-color: #e5e5e5;
      padding: 46px 24px;
      margin: 5px 0 27px 0;
      > p {
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        > small {
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          display: inline-block;
          width: 78px;
        }
      }
      p:last-of-type {
        height: 47px;
        line-height: 47px;
        small {
          vertical-align: top;
        }
        span {
          color: $activeBgColor;
          font-size: $telFontSize;
          font-weight: bold;
          em {
            font-size: $navClassifyH3FontSize;
            font-style: normal;
          }
        }
      }
    }
    > ul {
      border: {
        top: 1px solid #e5e5e5;
        bottom: 1px solid #e5e5e5;
      }
      height: 42px;
      width: 100%;
      margin-bottom: 15px;
      li {
        float: left;
        line-height: 42px;
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        margin: 0 23px;
      }
      li:first-of-type {
        margin-left: 85px;
      }
    }
    .color {
      overflow: hidden;
      margin-bottom: 20px;
      > h3 {
        margin: 14px 0 0 24px;
        float: left;
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        vertical-align: middle;
        width: 75px;
      }
      > ul {
        float: left;
        li {
          float: left;
          width: 45px;
          height: 44px;
          border: 1px solid $topAndFooterBgColor;
          cursor: pointer;
          margin: 0 5px;
          img {
            display: block;
            width: 97%;
            margin: 0 auto;
          }
        }
        .active {
          border: 1px solid $activeBgColor;
        }
        li:hover {
          border: 1px solid $activeBgColor;
        }
      }
    }
    .count {
      overflow: hidden;
      margin-bottom: 20px;
      > h3 {
        margin: 14px 0 0 24px;
        float: left;
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        vertical-align: middle;
        width: 75px;
      }
      input {
        float: left;
        line-height: 39px;
        height: 39px;
        border: 1px solid $topAndFooterBgColor;
        border-right: none;
        text-align: center;
        width: 54px;
        margin-left: 5px;
        color: $topAndNavColor;
        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
      }
      span {
        float: left;
        width: 16px;
        height: 39px;
        .add,
        .down {
          text-align: center;
          line-height: 20px;
          font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
          color: $topAndNavColor;
          background-color: transparent;
          float: left;
          width: 16px;
          height: 20px;
          border: 1px solid $topAndFooterBgColor;
          cursor: pointer;
        }
        .add {
          border-bottom: none;
        }
        .down {
          height: 21px;
        }
      }
    }
    .shopping {
      overflow: hidden;
      margin: 0 0 30px 104px;
      > a {
        display: block;
        float: left;
        height: 51px;
        line-height: 51px;
        text-align: center;
        border: 1px solid $activeBgColor;
        width: 188px;
        font-size: $navClassifyH3FontSize;
        background-color: #fde1e1;
        margin-right: 11px;
        cursor: pointer;
      }
      a:first-of-type {
        background-color: $activeBgColor;
        color: #fff;
      }
      .add_love {
        width: 122px;
        img {
          vertical-align: middle;
          margin-right: 9px;
        }
      }
    }
    .service {
      overflow: hidden;
      margin-bottom: 20px;
      > h3 {
        margin: 0 0 0 24px;
        float: left;
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        vertical-align: middle;
        width: 75px;
      }
      ul {
        overflow: hidden;
        width: 465px;
        li {
          float: left;
          color: $topAndNavColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          width: 113px;
          margin-bottom: 8px;
        }
      }
    }
  }
}
.shop_area {
  height: 45px;
  width: 100%;
  background-color: #000;
  .shop_search {
    width: 151px;
    height: 24px;
    margin: 10px 70px 0 51px;
    float: left;
    input {
      width: 117px;
      height: 22px;
      border: 1px solid #b5b5b5;
      border-right: none;
      float: left;
      font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
      color: $topAndNavColor;
      padding-left: 5px;
    }
    button {
      float: left;
      cursor: pointer;
      img {
        display: block;
      }
    }
  }
  > ul {
    li {
      float: left;
      height: 45px;
      line-height: 45px;
      margin-right: 10px;
      a {
        display: block;
        height: 100%;
        color: #fff;
        text-align: center;
        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
        padding: 0 32px;
      }
    }
    li:hover {
      a {
        background-color: $activeBgColor;
      }
    }
    .active {
      a {
        background-color: $activeBgColor;
      }
    }
  }
}
.section_bottom {
  overflow: hidden;
  padding-bottom: 30px;
  .sidebar {
    background-color: #f7f6f6;
    width: 252px;
    padding-top: 27px;
    float: left; // margin-right: 10px;
    .local_search {
      width: 252px;
      > h3 {
        background-color: #000;
        height: 55px;
        line-height: 55px;
        padding-left: 6px;
        width: 246px;
        color: #fff;
        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
      }
      form {
        border: 1px solid #b5b5b5;
        border-top: none;
        width: 250px;
        padding: 14px 0 23px 0;
        overflow: hidden;
        text-align: center;
        background-color: #fff;
        > label {
          color: $topAndNavColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          float: left;
          margin-left: 28px;
          line-height: 23px;
        }
        > input {
          height: 21px;
          border: 1px solid $proBottomBgColor;
          float: left;
          margin-bottom: 13px;
          color: $topAndNavColor;
          padding-left: 5px;
        }
        label:last-of-type {
          margin: 0 6px;
        }
        #keyword {
          width: 130px;
          clear: right;
        }
        #min,
        #max {
          width: 48px;
        }
        #min {
          margin-left: 2px;
        }
        input:last-of-type {
          height: auto;
          border: none;
          float: none;
          margin: auto;
          padding: 0;
          color: #000;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          display: block;
          clear: both;
          background-color: transparent;
          cursor: pointer;
        }
      }
    }
    .custom_service {
      width: 252px;
      margin-top: 56px;
      > h3 {
        background-color: #000;
        height: 55px;
        line-height: 55px;
        padding-left: 6px;
        width: 246px;
        color: #fff;
        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
      }
      > div {
        border: 1px solid #b5b5b5;
        border-top: none;
        width: 250px;
        padding: 12px 0 20px 0;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        color: $topAndNavColor;
        background-color: #fff;
        > h5 {
          margin-left: 5px;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
        }
        > span {
          display: block;
          margin-left: 33px;
          margin-top: 12px;
        }
        span:last-of-type {
          margin-top: 3px;
        }
      }
    }
    .hot_ad {
      width: 252px;
      // margin-top: 56px;
      > h3 {
        background-color: #000;
        height: 55px;
        line-height: 55px;
        padding-left: 6px;
        width: 246px;
        color: #fff;
        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
      }
      ul {
        border: 1px solid #b5b5b5;
        border-top: none;
        background-color: #fff;
        padding-top: 45px;
        li {
          margin-bottom: 103px;
          a {
            display: block;
            width: 100%;
            img {
              display: block;
              width: 230px;
              margin: 0 auto;
            }
          }
          p {
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: $topAndNavColor;
            height: 20px;
            line-height: 20px;
            width: 85%;
            margin: 33px 0 0 12px;
            span {
              color: $activeBgColor;
              font-weight: bold;
              display: block;
              float: right;
              line-height: 20px;
            }
            em {
              color: #fff;
              background-color: $activeBgColor;
              border-radius: 20px;
              display: block;
              font-style: normal;
              width: 20px;
              height: 20px;
              text-align: center;
              float: left;
              margin-right: 3px;
            }
          }
        }
      }
    }
  } // 商品评价
  .com_main {
    overflow: hidden;
    width: 937px;
    padding-top: 27px;
    padding-left: 10px;
    display: none;
    margin-bottom: 58px;
    > h3 {
      height: 49px;
      width: 906px;
      padding-left: 31px;
      color: $navClassifyChildAndTitleColor;
      font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
      line-height: 49px;
      background-color: #e5e5e5;
    }
    .summary {
      width: 100%;
      overflow: hidden;
      .grade {
        border: 1px solid #aaa;
        width: 88px;
        height: 134px;
        width: 133px;
        margin-right: 11px;
        float: left;
        text-align: center;
        > h5 {
          font-weight: normal;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: #333;
          margin-top: 38px;
        }
        > span {
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
      > ul {
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
          > a {
            padding: 0 10px;
            color: #999;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          }
        }
      }
    }
    .sort {
      width: calc(100% - 28px);
      height: 35px;
      padding: 0 14px;
      background-color: #f2f2f2;
      > li {
        height: 35px;
        float: left;
        margin: 0 21px;
        a {
          line-height: 35px;
          display: block;
          height: 100%;
          color: $topAndNavColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        }
      }
      > li:last-of-type {
        float: right;
        position: relative;
        border: 1px solid #f2f2f2;
        height: 33px;
        > a {
          line-height: 33px;
        }
        > ul {
          display: none;
          position: absolute;
          border: 1px solid #999;
          border-top: none;
          left: -1px;
          z-index: 99;
          > li {
            cursor: pointer;
            min-width: 73px;
            height: 35px;
            line-height: 35px;
            color: $topAndNavColor;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            background-color: #fff;
          }
          > li:hover {
            background-color: #f2f2f2;
          }
        }
      }
      li.on {
        background-color: #fff;
        border: 1px solid #999;
        border-bottom-color: #fff;
      }
    }
    .estimate {
      width: 100%;
      > li {
        width: 100%;
        border-bottom: 1px solid #dcdcdc;
        margin-bottom: 6px;
        overflow: hidden;
        .user_info {
          float: left;
          margin-left: 23px;
          > img {
            display: block;
            width: 35px;
            height: 35px;
            border-radius: 35px;
            float: left;
            margin-right: 5px;
          }
          > span {
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            overflow: hidden;
            display: block;
            line-height: 35px;
            margin-bottom: 4px;
            color: #666;
          }
          p {
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: $topAndNavColor;
          }
        }
        .estimate_main {
          float: right;
          width: 725px;
          margin-top: 8px;
          padding-bottom: 7px;
          .ori_estimate {
            position: relative;
            > ul {
              height: 18px;
              margin-bottom: 9px;
              li {
                float: left;
                width: 18px;
                height: 18px;
                background-image: url(../assets/images/hx_icon.png);
              }
            }
            > p {
              color: #030303;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              line-height: 30px;
            }
            > span {
              color: $topAndNavColor;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              line-height: 38px;
            }
            .good,
            .msg {
              position: absolute;
              cursor: pointer;
              bottom: 7px;
              line-height: 25px;
              color: $topAndNavColor;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              img {
                vertical-align: top;
                margin-right: 5px;
              }
            }
            .good {
              left: 612px;
            }
            .msg {
              left: 671px;
            }
          }
          .add_estimate {
            border-top: 1px solid #dcdcdc;
            padding: 8px 0 12px 0;
            > h4 {
              color: $topAndNavColor;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              font-weight: normal;
              line-height: 30px;
            }
            > p {
              color: #030303;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              line-height: 30px;
            }
          }
        }
      }
      > li:first-of-type {
        padding-top: 20px;
      }
    }
    .page {
      width: 100%;
      margin-top: 35px;
      text-align: center;
      ul {
        display: inline-block;
        li {
          height: 17px;
          float: left;
          margin: 0 6px;
        }
        a {
          display: block;
          line-height: 17px;
          text-align: center;
          padding: 0 5px;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        }
        .on {
          a {
            background-color: $activeBgColor;
            color: #fff;
          }
        }
        li:hover {
          a {
            background-color: $activeBgColor;
            color: #fff;
          }
        }
        li:nth-last-of-type(2) :hover {
          background-color: transparent;
          color: $topAndNavColor;
        }
      }
    }
  } //商品详情
  .pro_main {
    width: 946px;
    float: left;
    margin-top: 26px;
    .details {
      width: calc(100% - 40px);
      padding: 0 0 25px 40px;
      background-color: $proBottomBgColor;
      font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
      color: $topAndNavColor;
      > h4 {
        font-weight: normal;
        height: 80px;
        line-height: 80px;
      }
      > h5 {
        line-height: 25px;
      }
      > ul {
        width: 100%;
        overflow: hidden;
        li {
          line-height: 25px;
          width: 268px;
          float: left;
          margin-right: 40px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        li:nth-of-type(3n-1) {
          width: 155px;
        }
        li:nth-of-type(3n) {
          width: 355px;
          margin-right: 0;
        }
      }
    }
    .pro_img {
      width: 928px;
      margin: 0 auto;
      img {
        width: 100%;
        display: block;
      }
    }
    .article {
      width: calc(926px - 33px);
      padding-bottom: 7px;
      border: 1px solid #aaa;
      margin: 15px auto 6px auto;
      position: relative;
      padding-left: 33px;
      > h5 {
        color: $activeBgColor;
        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
        margin-top: 10px;
        line-height: 30px;
      }
      > p {
        line-height: 26px;
        width: 94%;
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
      }
    }
    .article::after {
      display: block;
      content: "";
      position: absolute;
      width: 20px;
      height: 127px;
      left: -1px;
      top: -1px;
      background-color: $activeBgColor;
    }
    > span {
      display: block;
      color: $topAndNavColor;
      font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
      padding-left: 42px;
    }
  }
}
</style>
