<template>
  <div class="lore_tbody">
            <div class="containe">
                <div class="logo">
                    <router-link to="/index">
                        <img src="../assets/images/logo02.png" alt="">
                    </router-link>
                </div>
                <div class="title">
                    <h1>
                        <span>文的商城</span>
                        <span>wendishangcheng</span>
                    </h1>
                    <h2>欢迎登录</h2>
                </div>
                <p>
                    <router-link to="/index">返回首页</router-link> |
                    <a href="#">帮助中心</a>
                </p>
            </div>
        </div>
</template>
<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
.lore_tbody {
  width: 100%;
  height: 144px;
  background-color: #000;
  .containe {
    width: 892px;
    margin: 0 auto;
    overflow: hidden;
    .logo {
      width: 187px;
      height: 124px;
      float: left;
      margin-right: 18px;
      img {
        width: 100%;
      }
    }
    .title {
      float: left;
      overflow: hidden;
      margin-top: 50px;
      > h1 {
        float: left;
        width: 117px;
        text-align: center;
        color: #fff;
        font-size: 21px;
        > span:last-of-type {
          font-size: 12px;
        }
      }
      > h2 {
        float: left;
        border-left: 1px solid #fff;
        padding-left: 4px;
        font-size: 38.5px;
        color: #fff;
        margin-left: 8px;
        margin-top: 12px;
        line-height: 37px;
      }
    }
    > p {
      clear: both;
      text-align: right;
      color: #fff;
      font-size: $topFontSize;
      vertical-align: middle;
      a {
        font-size: $topFontSize;
        color: #fff;
      }
    }
  }
}
</style>
