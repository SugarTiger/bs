<template>
  <div id="loginPage">
    <loreTbody/>
        <div class="main">
            <div class="title">
                <h3>
                    <router-link to="/index">进入微动商城</router-link>
                </h3>
            </div>
            <div class="login">
                <div class="loginname">
                    <label for="loginname">
                        <img src="../assets/images/user_icon.png" alt="">
                    </label>
                    <input type="text" id="loginname" name="loginname" v-model.trim="loginname" placeholder="手机号/邮箱">
                    <em class="aw"></em>
                </div>
                <div class="pwd">
                    <label for="pwd">
                        <img src="../assets/images/pwd_icon.png" alt="">
                    </label>
                    <input type="password" id="pwd" name="pwd" v-model.trim="pwd" placeholder="密码">
                    <em class="aw"></em>
                </div>
                <div class="yicon">
                    <input type="text" name="yicon" v-model.trim="yicon" placeholder="验证码" id="yicon">
                    <span class="yimg ">
                        <img :src="ycodeObj.url" :alt="ycodeObj.alt" @click="changeYcode">
                    </span>
                    <span @click="changeYcode">看不清，换一张</span>
                    <em class="aw"></em>
                </div>
                <input type="submit" value="登录 " id="login" @click="toLogin">
            </div>
            <p>
              <router-link to="/register">注册微动账号</router-link> |
              <a href="# ">忘记密码</a>
            </p>
        </div>
  </div>
</template>

<script>
import loreTbody from "../components/loreTbody";
const md5 = require('md5');
export default {
  components: {
    loreTbody
  },
  data(){
    return {
      loginname:'',
      pwd:'',
      ycodeObj:{},
      yicon:''
    }
  },
  created(){
    this.changeYcode();
  },
  methods:{
    changeYcode(){
      this.ycodeObj = this.$util.getYM();
    },
    toLogin(){
      if(this.loginname === ''){
        this.$message.error('用户名不能为空');
        return;
      }
      if(this.pwd === ''){
        this.$message.error('密码不能为空');
        return;
      }
      if(this.yicon === ''){
        this.$message.error('请填写验证码');
        return;
      }else if(this.yicon.toLocaleLowerCase()!==this.ycodeObj.alt.toLocaleLowerCase()){
        this.$message.error('验证码填写错误');
        this.changeYcode();
        return;
      }
      this.$api.post('/login',{
            loginName:this.loginname,
            pwd:md5(this.pwd)
        },(res)=>{
            if(res.status===1){
                this.$util.setToken(res.data.token)
                this.$router.replace({name:'user'});
                return;
            }else{
                this.$message.error(res.msg)
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#loginPage {
  background-color: $proBottomBgColor;
  .main {
    width: 892px;
    height: 573px;
    background-color: #fff;
    margin: 0 auto;
    padding: 84px 0;
    .title {
      text-align: center;
      > h3 {
        text-align: center;
        margin-top: 6px;
        a {
          font-size: $navAndTitleAndSearchFontSize;
          color: $activeBgColor;
        }
      }
    }
    > .login {
      // width: 391px;
      margin: 34px 0 24px 250.5px;
      height: 266px;
      > div {
        margin-bottom: 11px;
        width: 100%;
        height: 54px;
        .aw {
          float: left;
          font-style: normal;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          height: 54px;
          line-height: 54px;
          width: 240px;
          padding-left: 10px;
          background-color: #fff;
          color: $activeBgColor;
          display: none;
        }
      }
      label {
        float: left;
        height: 54px;
        line-height: 54px;
        padding: 0 15px;
        img {
          vertical-align: middle;
        }
      }
      input {
        float: left;
        height: 54px;
        background-color: $proBottomBgColor;
        color: $topAndNavColor;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        width: 326px;
      }
      .loginname {
        > label {
          background-color: $proBottomBgColor;
        }
        > input {
          float: left;
        }
      }
      .pwd {
        overflow: hidden;
        line-height: 54px;
        > label {
          padding: 0 18px;
          background-color: $proBottomBgColor;
        }
        > input {
          float: left;
        }
      }
      .yicon {
        > input {
          text-align: center;
          width: 131px;
        }
        > span {
          float: left;
          cursor: pointer;
        }
        > span:first-of-type {
          width: 126px;
          height: 54px;
          margin: 0 13px;
          img {
            width: 126px;
            height: 54px;
          }
        }
        > span:last-of-type {
          margin-top: 35px;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
        }
        .aw {
          padding-left: 18px;
        }
      }
      > input {
        width: 391px;
        color: #fff;
        font-size: $navAndTitleAndSearchFontSize;
        background-color: $activeBgColor;
        cursor: pointer;
        margin-top: 16px;
        text-align: center;
      }
    }
    > p {
      width: 100%;
      text-align: center;
      font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
      color: $topAndNavColor;
      display: none;
    }
  }
}
</style>
