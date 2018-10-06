<template>
  <div id="shopList">
    <topBody searchEvent @searchEvent="searchEvent"/>
    <navTab changeEvent @changeTab="changeTab" :index="navIndex"/>
    <ul class="crumbs">
        </ul>
        <div class="containe">
            <div class="sideleft">
                <div class="hot_pro">
                    <h3>热卖商品</h3>
                    <ul>
                        <li v-for="(pro,i) in hostList" :key="i">
                            <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">
                              <img :src="imgServer+pro.goods_img[0]" alt="">
                            </router-link>
                            <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">
                              <span>{{pro.goods_name}}</span>
                                <del>{{pro.goods_marketPrice}}</del>
                                <em>{{pro.goods_price}}</em>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main">
                <div class="sort">
                    <h5>排列方式：</h5>
                    <ul>
                        <li @click="proSort" class="active">
                            <a href="javascript:void(0)">默认</a>
                        </li>
                        <li @click="sortSale">
                            <a href="javascript:void(0)">销量</a>
                        </li>
                        <li @click="sortpri">
                            <a href="javascript:void(0)">价格</a>
                        </li>
                    </ul>
                </div>
                <ul class="pro_list" v-if="proList.length>0">
                    <li v-for="(pro,i) in proList" :key="i">
                        <div class="pro_info">
                            <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">
                              <img :src="imgServer+pro.goods_img[0]" alt="">
                            </router-link>
                            <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">
                              <span>{{pro.goods_name}}</span>
                                <del>{{pro.goods_marketPrice}}</del>
                                <em>{{pro.goods_price}}</em>
                            </router-link>
                        </div>
                        <div class="handle">
                            <a  @click="toSubOrder(pro.goods_id)">立即购买</a>
                            <a  @click="addshopcart(pro.goods_id)" class="addshopcart">加入购物车</a>
                        </div>
                    </li>
                </ul>
                <div class="page" v-else>
                    暂无相关商品
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import topBody from "@/components/topBody";
import navTab from "@/components/navTab";
import { imgServer } from "@/utils/config";
// 改变bg高度的函数
function bgH(obj) {
  var parentH = obj.parent().innerHeight();
  obj.css("height", parentH - 38 + "px");
}
// 高级选项
function hclick(obj) {
  $(".type_list").fadeOut();
  $(".type>li").css(
    "background-image",
    "url(../assets/images/arrows_icon9.png)"
  );
}
export default {
  components: {
    topBody,
    navTab
  },
  data() {
    return {
      proList: [],
      hostList: [],
      temList: [],
      imgServer,
      navIndex:Number(this.$route.query.index),
      type:undefined
    };
  },
  created() {
    var query = this.$route.query;
    this.keyword = query.keyword
      if (query.type === "商品列表" || query.type === "爆款推荐" || !query.type){
        this.type = undefined
      }else{
        this.type = query.type
      }
    this.getProList();
    this.getHosProList();
  },
  mounted() {
    // 改变bg高度的函数
    bgH($(".bg"));
    // li点击改变样式
    $(".sort>ul>li,.option>ul>li").click(function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
    // 加入购物车，添加到本地存储
    $(".addshopcart").click(function() {
      var i = Math.floor(Math.random() * 6);
      proInfoArr[i].count = 1;
      addtoLocals(new Proinfo(proInfoArr[i]));
      prosum();
    });
    $("body").click(function() {
      $(".type_list").hide();
      $(".type>li").css(
        "background-image",
        "url(../assets/images/arrows_icon9.png)"
      );
    });
    $(".type>li").click(function(event) {
      event.stopPropagation();
      var i = $(this).index();
      var data_i = $(".type_list").attr("data_i");
      var listdisplay = $(".type_list").css("display");
      $(this).css(
        "background-image",
        "url(../assets/images/arrows_icon9_2.png)"
      );
      $(".type_list>ul")
        .eq(i)
        .show()
        .siblings()
        .css("display", "none");
      var h = $(".type_list").innerHeight();
      if (i !== parseInt(data_i)) {
        $(".type_list")
          .css("display", "block")
          .css("bottom", -h + 7 + "px");
        $(this)
          .siblings()
          .css("background-image", "url(../assets/images/arrows_icon9.png)");
      } else {
        $(".type_list")
          .fadeToggle()
          .css("bottom", -h + 7 + "px");
        if (listdisplay !== "block") {
          $(this).css(
            "background-image",
            "url(../assets/images/arrows_icon9_2.png)"
          );
        } else {
          $(this).css(
            "background-image",
            "url(../assets/images/arrows_icon9.png)"
          );
        }
      }
      $(".type_list").attr("data_i", i);
      $(".type_list>ul")
        .eq(i)
        .find("li")
        .on("click", hclick)
        .parent()
        .siblings()
        .find(">li")
        .off("click", hclick);
    });
    $("#priceMin").on("input", function() {
      var temp = this.value.replace(/[^0-9.]/g, "");
      if (temp.indexOf(".") === 0 || temp.indexOf(0) === 0) {
        this.value = "";
        return;
      }
      var len2 = temp.length;
      this.value = temp;
      var d = temp[len2 - 1];
      if (d === ".") {
        if (this.value.slice(0, len2 - 1).indexOf(".") !== -1) {
          this.value = temp.slice(0, len2 - 1);
        }
      }
    });
    $("#priceMax").on("input", function() {
      var temp = this.value.replace(/[^0-9.]/g, "");
      if (temp.indexOf(".") === 0 || temp.indexOf(0) === 0) {
        this.value = "";
        return;
      }
      var len2 = temp.length;
      this.value = temp;
      var d = temp[len2 - 1];
      if (d === ".") {
        if (this.value.slice(0, len2 - 1).indexOf(".") !== -1) {
          this.value = temp.slice(0, len2 - 1);
        }
      }
    });
    // 确定验证
    $("#priceBtn").click(function() {
      var min = $("#priceMin").val(),
        max = $("#priceMax").val();
      if (min === "" || max === "") {
        return;
      }
      if (parseFloat(min) > parseFloat(max)) {
        alert("价格错误");
        return false;
      }
    });
  },
  methods: {
    searchEvent(keyWord){
      this.keyword = keyWord;
      this.type = '';
      this.getProList();
    },
    getProList: function() {
      var that = this;
      this.$api.get(
        "/public/getProList",
        {
          status: 1,
          type: this.type,
          keyWord: this.keyword
        },
        function(res) {
          that.proList = res.data.list;
          that.temList = res.data.list;
        }
      );
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
    },
    toSubOrder: function(proId) {
      if (!getToken()) {
        alert("请先登录微动商城！");
        location.href = "login.html";
        return;
      }
      var orderPro = [{ qty: 1, proId: proId }];
      var href = "confirm_order.html?orderPro=" + JSON.stringify(orderPro);
      location.href = href;
    },
    addshopcart: function(proId) {
      if (!getToken()) {
        alert("请先登录微动商城！");
        location.href = "login.html";
        return;
      }
      console.log(proId);
      this.$api.post(
        "/updateCartPro",
        {
          qty: 1,
          proId: proId,
          type: 1
        },
        function(res) {}
      );
    },
    proSort: function() {
      this.proList = this.temList;
      this.proList.sort(function(a, b) {
        return a.goods_id - b.goods_id;
      });
    },
    sortSale: function() {
      this.proList = this.temList;
      this.proList.sort(function(a, b) {
        return b.goods_sales - a.goods_sales;
      });
    },
    sortpri: function() {
      this.proList = this.temList;
      this.proList.sort(function(a, b) {
        return b.goods_price - a.goods_price;
      });
    },
    changeTab(nav){
      if(nav.to === 'index'){
        this.$router.push('index')
        return;
      }
      console.log(nav.to.query.type )
      this.navIndex = nav.to.query.index
      if (nav.to.query.type === "商品列表" || nav.to.query.type === "爆款推荐" || !nav.to.query.type){
        this.type = undefined;
      }else{
        this.type = nav.to.query.type
      }
      this.getProList();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#shopList {
  background-color: #fff;
  .containe {
    overflow: hidden;
    .sideleft {
      float: left;
      width: 216px;
      margin-right: 16px;
      .bar {
        > h2 {
          height: 89px;
          line-height: 89px;
          text-align: center;
          background-color: #000;
          color: #fff;
          font-size: $navClassifyH3FontSize;
        }
        > ul {
          width: 100%;
          > li {
            border-top: 1px solid #c9c9c9;
            border-left: 1px solid #c9c9c9;
            border-right: 1px solid #c9c9c9;
            width: calc(100% - 2px);
            height: 58px;
            background-color: #d2d2d2;
            cursor: pointer;
            text-align: center;
            a {
              display: block;
              text-align: center;
              height: 58px;
              line-height: 58px;
              width: 100%;
              color: #000;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            }
          }
          > li:last-of-type {
            border-bottom: 1px solid #c9c9c9;
          }
          > li:hover,
          .active {
            border-color: $activeBgColor;
            background-color: $activeBgColor;
          }
        }
      }
      .hot_pro {
        margin-top: 15px;
        width: 214px;
        border: 1px solid #d2d2d2;
        > h3 {
          padding-left: 10px;
          height: 56px;
          line-height: 56px;
          background-color: $activeBgColor;
          font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
          color: #fff;
        }
        > ul {
          width: 100%;
          padding-bottom: 49px;
          > li {
            width: 194px;
            border: 1px solid #d2d2d2;
            cursor: pointer;
            margin: 56px auto 0 auto;
            a {
              display: block;
              width: 194px;
              min-height: 165px;
              img {
                display: block;
                width: 100%;
              }
            }
            > a:last-of-type {
              min-height: 0;
              border-top: 1px solid #d2d2d2;
              color: #666666;
              padding: 8px 0 4px 0;
              background-color: $proBottomBgColor;
              > span {
                display: block;
                line-height: 18px;
                text-align: center;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              }
              > del {
                display: block;
                text-align: center;
                line-height: 18px;
                font-size: 12px;
              }
              > em {
                display: block;
                line-height: 18px;
                text-align: center;
                font-style: normal;
                font-weight: bold;
                font-size: 12px;
                color: $activeBgColor;
              }
            }
          }
        }
      }
    }
    .main {
      float: left;
      width: 965px;
      .options {
        border: 1px solid #eee;
        border-radius: 2px;
        > div {
          width: calc(100% - 2px);
          border-radius: 1px;
          border: 1px solid #b9b9b9;
          position: relative;
          > h3 {
            background-color: #eee;
            font-weight: normal;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: $topAndNavColor;
            height: 32px;
            line-height: 32px;
            border-bottom: 1px solid #b9b9b9;
            padding: 6px 0 0 27px;
          }
          .bg {
            position: absolute;
            width: 117px;
            background-color: #eee;
            top: 38px;
            z-index: 1;
          }
          .option {
            width: 921px;
            overflow: hidden;
            background: url("../assets/images/bg.png") repeat-x center bottom;
            padding: 9px 0 12px 6px;
            margin-left: 20px;
            z-index: 2;
            position: relative;
            > h5 {
              font-weight: normal;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              color: $topAndNavColor;
              height: 23px;
              line-height: 23px;
              float: left;
            }
            > ul {
              float: left;
              > li {
                height: 23px;
                line-height: 23px;
                float: left;
                margin: 0 8px;
                cursor: pointer;
                > a {
                  display: block;
                  height: 23px;
                  line-height: 23px;
                  margin: 0 5px;
                  font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                  color: $topAndNavColor;
                }
              }
              .active,
              > li:hover {
                background-color: $activeBgColor;
                color: #fff;
                > a {
                  background-color: $activeBgColor;
                  color: #fff;
                }
              }
            }
            .price_range {
              clear: both;
              height: 23px;
              padding-top: 3px;
              margin-left: 105px;
              > input {
                height: 18px;
                width: 36px;
                line-height: 18px;
                text-align: center;
                color: $topAndNavColor;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                border: 1px solid #d8d8d8;
              }
              > em {
                color: $topAndNavColor;
              }
              > button {
                width: 40px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color: $topAndNavColor;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                background-color: #d8d8d8;
                cursor: pointer;
                border-radius: 3px;
              }
            }
          }
          .height_op {
            width: 921px;
            padding: 8px 0 8px 6px;
            margin-left: 20px;
            z-index: 2;
            position: relative;
            > h5 {
              font-weight: normal;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              color: $topAndNavColor;
              height: 23px;
              line-height: 23px;
              float: left;
              margin-right: 26px;
            }
            .type {
              overflow: hidden;
              float: left;
              > li {
                cursor: pointer;
                border: 1px solid #d8d8d8;
                height: 24px;
                line-height: 24px;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                color: $topAndNavColor;
                padding: 0 25px 0 9px;
                background: url("../assets/images/arrows_icon9.png") no-repeat
                  right;
                float: left;
                margin: 0 8.5px;
              }
            }
            .type_list {
              position: absolute;
              left: -22px;
              bottom: -207px;
              width: 964px;
              border: 1px solid #d8d8d8;
              background: #fff;
              display: none;
              > ul {
                display: none;
                overflow: hidden;
                > li {
                  height: 23px;
                  line-height: 23px;
                  font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                  color: $topAndNavColor;
                  padding: 0 5px;
                  float: left;
                  cursor: pointer;
                  margin: 10px 8px;
                }
                .active,
                > li:hover {
                  background-color: $activeBgColor;
                  color: #fff;
                }
              }
            }
          }
          .height_op::after {
            content: "";
            display: block;
            clear: both;
          }
        }
      }
      .sort {
        width: calc(100% - 2px);
        background-color: $proBottomBgColor;
        border: 1px solid #e5e5e5;
        height: 34px;
        margin: 16px 0 39px 0;
        > h5 {
          font-weight: normal;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
          height: 34px;
          line-height: 34px;
          float: left;
          margin: 0 23px 0 25px;
        }
        > ul {
          height: 34px;
          float: left;
          > li {
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            color: $topAndNavColor;
            height: 33px;
            line-height: 33px;
            float: left;
            border: 1px solid #999;
            > a {
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              color: $topAndNavColor;
              height: 33px;
              line-height: 33px;
              padding: 0 25px 0 11px;
              display: block;
              background: url("../assets/images/arrows_icon10.png") no-repeat
                right;
            }
          }
          .active {
            border-color: #fff;
            a {
              text-align: center;
              padding: 0 17px;
              background-image: none;
              background-color: #fff;
            }
          }
        }
      }
      .pro_list {
        width: 100%;
        overflow: hidden;
        > li {
          float: left;
          width: 230px;
          text-align: center;
          margin: 0 4px 0 7px;
          .pro_info {
            border: 1px solid #d2d2d2;
            cursor: pointer;
            > a:first-of-type {
              display: block;
              width: 200px;
              height: 200px;
              margin: 2px auto 0 auto;
              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            > a:last-of-type {
              display: block;
              border-top: 1px solid #d2d2d2;
              color: #666666;
              height: 120px;
              padding: 8px 0 4px 0;
              background-color: $proBottomBgColor;
              > span {
                display: block;
                line-height: 18px;
                text-align: center;
                font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
              }
              > del {
                display: block;
                text-align: center;
                line-height: 18px;
                font-size: 14px;
              }
              > em {
                display: block;
                line-height: 18px;
                text-align: center;
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                color: $activeBgColor;
              }
            }
          }
          .handle {
            display: inline-block;
            margin: 21px auto 20px auto;
            > a:first-of-type,
            .addshopcart {
              display: inline-block;
              border-radius: 6px;
              background-color: $activeBgColor;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              color: #fff;
              text-align: center;
              width: 86px;
              height: 22px;
              line-height: 22px;
              cursor: pointer;
            }
            > a:first-of-type {
            }
            .addshopcart {
              background-color: #f39800;
            }
          }
        }
        > li:hover,
        .active {
          .pro_info {
            border-color: $activeBgColor;
            background-color: $activeBgColor;
            > a:last-of-type {
              border-color: $activeBgColor;
              background-color: $activeBgColor;
              color: #fff;
              > em {
                color: #fff;
              }
            }
          }
        }
      }
      .page {
        text-align: center;
        margin: 22px 0 46px 0;
        > ul {
          display: inline-block;
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
    }
  }
}
</style>

