<template>
  <div class="top">
            <div class="containe">
                <div class="left">
                    <a href="index.html"><img src="../assets/images/home_icon.png" alt="">文的首页</a>
                    |
                    <span class="loginzt">
                        <a href="login.html" v-if="!isLogin">登录</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a  href="#" v-if="isLogin" @click="logout">退出登录</a>
                        <a href="register.html" v-else>免费注册</a>
                    </span>
                </div>
                <ul class="shop" v-if="isLogin">
                    <li><a href="order.html">我的订单</a></li>
                    <li><a href="user.html">我的文的</a></li>
                    <li>|</li>
                    <li><a href="shop_cart.html">购物车</a><sup>{{cartCount}}</sup></li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
      cartCount: 0,
      isLogin: false
    };
  },
  methods: {
    logout() {}
  }
};
</script>

<style lang="scss">
$topAndFooterBgColor:#d2d2d2;
$topAndNavColor:#666;
$topFontFamily:SimSun;
.top {
  width: 100%;
  height: 30px;
  background-color: $topAndFooterBgColor;
  color: $topAndNavColor;
  .left {
    float: left;
    height: 30px;
    > a {
      line-height: 30px;
      margin-right: 17px;
    }
    > span {
      margin-left: 16px;
    }
  }
  .shop {
    float: right;
    overflow: hidden;
    height: 30px;
    li {
      float: left;
      height: 30px;
      margin: 0 9px;
      a {
        line-height: 30px;
      }
      sup {
        background-color: #dd9931;
        border-radius: 10px;
        display: block;
        float: right;
        text-align: center;
        min-width: 13px;
        padding: 0 2px;
      }
    }
    li:nth-of-type(3),
    li:nth-of-type(5) {
      line-height: 30px;
    }
  }
  img {
    display: block;
    float: left;
    margin: 7px 5px 0 0;
  }
  a {
    font-family: $topFontFamily;
  }
}
</style>
