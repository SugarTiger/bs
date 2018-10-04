<template>
  <div class="top">
            <div class="containe">
                <div class="left">
                    <router-link to="/"><img src="../assets/images/home_icon.png" alt="">微动首页</router-link>
                    |
                    <span class="loginzt">
                        <router-link to="login" v-if="!isLogin">登录</router-link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a  href="#" v-if="isLogin" @click="logout">退出登录</a>
                        <router-link to="register" v-else>免费注册</router-link>
                    </span>
                </div>
                <ul class="shop" v-if="isLogin">
                    <li><router-link to="order">我的订单</router-link></li>
                    <li><router-link to="user">我的微动</router-link></li>
                    <li>|</li>
                    <li><router-link to="shop_cart">购物车</router-link><sup>{{cartCount}}</sup></li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  },
  computed:{
    cartCount(){
      return this.$store.state.cartCount;
    }
  },
  methods: {
    logout() {
      this.$util.delToken();
      localStorage.removeItem("userName");
      this.$router.go(0);
    }
  },
  mounted() {
    if (!!this.$util.getToken()) {
      //已登录
      this.isLogin = true;
      this.$store.commit('getCartCount');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
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
