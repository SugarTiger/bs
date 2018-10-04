<template>
  <div id="shop_cart">
    <topBody/>
    <navTab :index="-1"/>
     <ul class="crumbs">
            <!-- <li>
                <router-link to="index">首页</router-link>
            </li>
            <li>
            </li>
            <li>
                <router-link to="shop_cart">我的购物车</router-link>
            </li> -->
        </ul>
        <div class="containe">
            <div class="shop_cart">
                <div class="cart_nav">
                    <ul>
                        <li class="active">全部商品</li>
                    </ul>
                </div>
                <ul class="title">
                    <li class="all_select" @click="allTocheck">
                        <span :class="{boxchecked:allChecked}"></span>
                        <input type="checkbox" checked>
                        <h3>全选</h3>
                    </li>
                    <li>商品</li>
                    <li>单价</li>
                    <li>数量</li>
                    <li>小计</li>
                    <li>操作</li>
                </ul>
                <div class="cart_main">
                    <div class="items">
                        <ul class="item" v-if="cartList.length!==0">
                            <li v-for="(pro,i) in  cartList" :class="{checked:pro.checked}" :key="i">
                                <div class="checkbox" @click="checkPro(i)">
                                    <span :class="{boxchecked:pro.checked}"></span>
                                    <input type="checkbox" checked="checked">
                                </div>
                                <div class="info">
                                    <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">
                                      <img :src="imgServer+pro.goods_img[0]" alt="">
                                    </router-link>
                                    <div>
                                            <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">
                                              {{pro.goods_name}}
                                            </router-link>
                                        <p>
                                            <img src="../assets/images/7_icon.png" alt="">支持7天无理由退货</p>
                                        <p>
                                            <img src="../assets/images/bao_icon.png" alt="">选廷保</p>
                                    </div>
                                    <span class="color">颜色分类：
                                        <span>{{pro.goods_color}}</span>
                                    </span>
                                </div>
                                <span class="price">{{pro.goods_price}}</span>
                                <div class="count">
                                    <button class="down" @click="downQty(i)">-</button>
                                    <input type="text" :value="pro.goods_quantity" :id="'proQty'+i" @input="inputEven(i)" @change="changeQty(i)">
                                    <button class="add" @click="addQty(i)">+</button>
                                </div>
                                <div class="subtotal">
                                    <em>￥ {{pro.goods_price * pro.goods_quantity}} 元</em>
                                </div>
                                <div class="handle">
                                    <span class="del" @click="removePro(i)">删除</span>
                                </div>
                            </li>
                        </ul>
                        <h5 v-else style="text-align: center;margin-top: 20px;">购物车空空如也哦！快<router-link style="color:red;font-size: 1em;text-decoration: underline;margin: 0 3px;" to="shop_list">去逛逛</router-link>吧</h5>

                    </div>
                    <div class="result">
                        <div class="handler">
                            <div class="all_select"  @click="allTocheck">
                                <span :class="{boxchecked:allChecked}"></span>
                                <input type="checkbox" checked>
                                <h3>全选</h3>
                            </div>
                            <span class="del_check" @click="removeAllPro">删除选中产品</span>
                        </div>
                        <div class="sum">
                            <span class="num">已选商品
                                <em>{{checkedCount}}</em>件
                                <img src="../assets/images/arrows_icon4.png" alt="">
                            </span>
                            <span class="allprice">合计(不含运费)：
                                <em>{{sum}}</em>
                            </span>
                        </div>
                        <a href="javascript:void(0)" @click="toSubOrder" :style="{opacity:this.checkedCount===0?0.5:1}">
                            结算
                        </a>
                    </div>
                </div>
            </div>
            <div class="you_like">
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
      cartList: [],
      imgServer
    };
  },
  methods: {
    getCart: function() {
      var that = this;
      this.$api.get("/getCart", null, function(res) {
        if (res.data.cartProList.length > 0) {
          res.data.cartProList.forEach(function(pro) {
            pro.checked = false;
          });
        }
        that.cartList = res.data.cartProList;
      });
    },
    checkPro: function(i) {
      this.cartList[i].checked = !this.cartList[i].checked;
    },
    allTocheck: function() {
      var isAllCheck = false;
      var len = this.cartList.length;
      if (len === 0) return false;
      for (var i = 0; i < len; i++) {
        if (!this.cartList[i].checked) {
          isAllCheck = true;
          break;
        }
      }
      for (var i = 0; i < len; i++) {
        this.cartList[i].checked = isAllCheck;
      }
    },
    addQty: function(i) {
      this.cartList[i].goods_quantity += 1;
      // 添加数量
      this.$api.post("/updateCartPro", {
        qty: 1,
        proId: this.cartList[i].goods_id,
        type: 1
      });
    },
    downQty: function(i) {
      if (this.cartList[i].goods_quantity === 1) return;
      this.cartList[i].goods_quantity -= 1;
      // 添加数量
      this.$api.post("/updateCartPro", {
        qty: 1,
        proId: this.cartList[i].goods_id,
        type: 0
      });
    },
    inputEven: function(i) {
      var pqt = $("#proQty" + i);
      var newQty = pqt.val();
      if (!/^[0-9]*$/.test(newQty) || newQty === "" || newQty === 0) {
        //检验是否是数字
        return pqt.val(this.cartList[i].goods_quantity);
      }
    },
    changeQty: function(i) {
      var pqt = $("#proQty" + i);
      var newQty = pqt.val();
      var result = Number(newQty) - this.cartList[i].goods_quantity;
      if (result > 0) {
        this.$api.post("/updateCartPro", {
          qty: Math.abs(result),
          proId: this.cartList[i].goods_id,
          type: 1
        });
      } else if (result < 0) {
        this.$api.post("/updateCartPro", {
          qty: Math.abs(result),
          proId: this.cartList[i].goods_id,
          type: 0
        });
      }
      this.cartList[i].goods_quantity = newQty;
    },
    removePro: function(i) {
      if (!confirm("确定删除商品吗？")) return;
      this.removeProHttp(this.cartList[i].goods_id);
      this.cartList.splice(i, 1);
    },
    removeAllPro: function() {
      if (this.checkedCount === 0) return;
      if (!confirm("确定删除选择的商品吗？")) return;
      for (var i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].checked) {
          this.removeProHttp(this.cartList[i].goods_id);
          this.cartList.splice(i, 1);
          i--;
        }
      }
    },
    removeProHttp: function(proId) {
      this.$api.post("/delCartPro", {
        proId: proId
      });
    },
    toSubOrder: function() {
      if (this.checkedCount === 0) return;
      var orderPro = [];
      var len = this.cartList.length;
      for (var i = 0; i < len; i++) {
        if (this.cartList[i].checked) {
          orderPro.push({
            qty: this.cartList[i].goods_quantity,
            proId: this.cartList[i].goods_id
          });
        }
      }
      location.href = "confirm_order.html?orderPro=" + JSON.stringify(orderPro);
    }
  },
  mounted: function() {
    this.getCart();
  },
  computed: {
    allChecked: function() {
      var len = this.cartList.length;
      if (len === 0) return false;
      for (var i = 0; i < len; i++) {
        if (!this.cartList[i].checked) {
          return false;
        }
      }
      return true;
    },
    checkedCount: function() {
      var len = this.cartList.length;
      if (len === 0) return 0;
      var sum = 0;
      for (var i = 0; i < len; i++) {
        if (this.cartList[i].checked) {
          sum += 1;
        }
      }
      return sum;
    },
    sum: function() {
      var len = this.cartList.length;
      if (len === 0) return 0;
      var sum = 0;
      for (var i = 0; i < len; i++) {
        if (this.cartList[i].checked) {
          sum =
            sum +
            this.cartList[i].goods_quantity * this.cartList[i].goods_price;
        }
      }
      return sum;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#shop_cart {
  background-color: #fff;
  .containe {
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
    .shop_cart {
      .cart_nav {
        height: 42px;
        line-height: 42px;
        ul {
          float: left;
          li {
            float: left;
            height: 38px;
            line-height: 38px;
            font-size: $navAndTitleAndSearchFontSize;
            color: #010101;
            width: 135px;
            border-bottom: 4px solid transparent;
            text-align: center;
            cursor: pointer;
          }
          .active {
            color: $activeBgColor;
            border-bottom: 4px solid $activeBgColor;
          }
          li:hover {
            color: $activeBgColor;
            border-bottom: 4px solid $activeBgColor;
          }
        }
        ul::after {
          clear: both;
          content: "";
          display: block;
        }
        .dc {
          float: right;
          span,
          select {
            outline: none;
            color: $topAndNavColor;
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          }
          select {
            margin-left: 10px;
          }
        }
      }
      .title {
        height: 50px;
        background-color: #e5e5e5;
        width: calc(100% - 56px);
        padding: 0 28px;
        margin-bottom: 7px;
        li {
          float: left;
          line-height: 50px;
          color: $topAndNavColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        }
        .all_select {
          width: 170px;
          > span {
            margin-top: 19px;
          }
        }
        li:nth-of-type(2) {
          min-width: 456px;
        }
        li:nth-of-type(3) {
          min-width: 171px;
          text-align: center;
        }
        li:nth-of-type(4) {
          min-width: 83px;
          text-align: center;
        }
        li:nth-of-type(5) {
          min-width: 115px;
          text-align: right;
        }
        li:nth-of-type(6) {
          min-width: 87px;
          text-align: left;
          margin-left: 62px;
        }
      }
      .cart_main {
        .items {
          .all_select {
            width: calc(100% - 28px);
            padding-left: 28px;
            height: 30px;
            line-height: 30px;
            span {
              margin-top: 9px;
            }
          }
          .item {
            border-top: 1px solid #aaa;
            width: 100%;
            > li {
              overflow: hidden;
              padding: 20px 0 21px 41px;
              font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
              color: $topAndNavColor;
              border: 1px solid #bfbfbf;
              .checkbox,
              .info,
              .color,
              .price,
              .count,
              .subtotal,
              .handle {
                float: left;
              }
              .checkbox {
                width: auto;
                padding-left: 0;
                span {
                  margin: 2px 0 0 0;
                }
              }
              .info {
                overflow: hidden;
                width: 601px;
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
                margin-left: 32px;
              }
              .price {
                width: 171px;
                text-align: center;
              }
              .count {
                width: 83px;
                color: #030303;
                .down,
                .add {
                  width: 19px;
                  height: 22px;
                  line-height: 20px;
                  text-align: center;
                  border: 1px solid $topAndFooterBgColor;
                  font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                  float: left;
                  cursor: pointer;
                  background-color: #fff;
                }
                input {
                  float: left;
                  background-color: #fff;
                  width: 45px;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  border-top: 1px solid $topAndFooterBgColor;
                  border-bottom: 1px solid $topAndFooterBgColor;
                  font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                }
              }
              .subtotal {
                width: 115px;
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
              .handle {
                margin-left: 62px;
                width: 87px;
                .del,
                .to_mylove,
                .attention {
                  cursor: pointer;
                  line-height: 26px;
                  text-align: left;
                  display: block;
                }
              }
            }
            .checked {
              background-color: #f8ebd7;
              border-left: 1px solid #f8ebd7;
              border-right: 1px solid #f8ebd7;
              .checkbox {
                span {
                  background-image: url(../assets/images/checkbox_true2.png);
                }
              }
            }
          }
        }
        .result {
          height: 48px;
          border: 1px solid $topAndFooterBgColor;
          line-height: 48px;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
          position: relative;
          margin-top: 30px;
          .handler {
            float: left;
            .all_select {
              margin-left: 26px;
              float: left;
              > span {
                margin: 18px 9px 0 0;
              }
              > h3 {
                color: #000;
              }
            }
            .del_check,
            .like_check {
              margin-left: 15px;
              cursor: pointer;
            }
          }
          .sum {
            float: right;
            padding-right: 135px;
            img {
              cursor: pointer;
            }
            em {
              font-style: normal;
              font-size: $navAndTitleAndSearchFontSize;
              color: $activeBgColor;
              font-weight: bold;
            }
            .allprice {
              margin-left: 65px;
            }
          }
          > a {
            position: absolute;
            height: 50px;
            width: 106px;
            right: 0;
            top: -1px;
            background-color: $activeBgColor;
            color: #fff;
            font-size: $navClassifyH3FontSize;
            text-align: center;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
