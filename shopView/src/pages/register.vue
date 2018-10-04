<template>
  <div id="register">
    <loreTbody/>
    <div class="main">
            <h2 class="title">新会员注册</h2>
            <div class="register">
                <div>
                    <label for="username">会员名：</label>
                    <input type="text" v-model.trim="userName" id="username" name="username" placeholder="请输入会员名">
                    <em class="aw_text">不能为空</em>
                </div>
                <div>
                    <label for="phone">手机：</label>
                    <input type="text" id="phone" v-model.trim="phone" name="phone" placeholder="请输入手机">
                    <em class="aw_text"></em>
                </div>
                <div>
                    <label for="email">邮箱：</label>
                    <input type="text" id="email" name="email" v-model.trim="email" placeholder="请输入邮箱">
                    <em class="aw_text"></em>
                </div>
                <div>
                    <label for="pwd">密码：</label>
                    <input type="password" id="pwd" name="pwd" v-model.trim="pwd" placeholder="请输入密码">
                    <em class="aw_text"></em>
                </div>
                <div>
                    <label for="repwd">确认密码：</label>
                    <input type="password" id="repwd" name="repwd" v-model.trim="repwd" placeholder="请再次输入密码">
                    <em class="aw_text"></em>
                </div>
                <div>
                    <label for="paywd">支付密码：</label>
                    <input type="password" id="paywd" name="paywd" v-model.trim="paywd" placeholder="请输入六位纯数字支付密码">
                    <em class="aw_text"></em>
                </div>
                <div>
                    <label for="repaywd">确认支付密码：</label>
                    <input type="password" id="repaywd" name="repaywd" v-model.trim="repaywd" placeholder="请再次输入支付密码">
                    <em class="aw_text"></em>
                </div>
                <div class="yicon">
                    <label for="yicon">验证码：</label>
                    <input type="text" name="yicon" v-model.trim="yicon" id="yicon" placeholder="验证码">
                    <span class="yimg">
                        <img :src="ycodeObj.url" :alt="ycodeObj.alt" @click="changeYcode">
                    </span>
                    <span @click="changeYcode">看不清，换一张</span>
                    <em class="aw_text"></em>
                </div>
                <div class="userdeal" @click="isChecked=!isChecked">
                    <span :class="{checked:isChecked}"></span>
                    <input type="checkbox" v-model="isChecked" name="userdeal" id="userdeal" >
                    <label for="userdeal">已阅读并同意</label>
                    <a href="#">《用户协议》</a>
                </div>
                <input type="button" value="立即注册" @click="toRegister" id="register">
                <p>
                    已有微动账号，
                    <router-link to="/login">直接登录</router-link>
                </p>
            </div>
        </div>
  </div>
</template>

<script>
import loreTbody from "../components/loreTbody";
const md5 = require("md5");
export default {
  components: {
    loreTbody
  },
  data() {
    return {
      userName: "",
      pwd: "",
      phone: "",
      email: "",
      repwd: "",
      paywd: "",
      repaywd: "",
      yicon: "",
      ycodeObj: {},
      isChecked: true
    };
  },
  created() {
    this.changeYcode();
  },
  methods: {
    changeYcode() {
      this.ycodeObj = this.$util.getYM();
    },
    toRegister() {
      if (!this.userName) {
        this.$notify.error({
          message: "会员名不能为空",
          title: "错误"
        });
        return;
      }
      if (!/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/.test(this.phone)) {
        this.$notify.error({
          message: "请输入有效的手机号",
          title: "错误"
        });
        return;
      }
      if (
        !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/i.test(
          this.email
        )
      ) {
        this.$notify.error({
          message: "请输入有效的邮箱地址",
          title: "错误"
        });
        return;
      }
      if (this.pwd.length < 8) {
        this.$notify.error({
          message: "密码长度必须大于8",
          title: "错误"
        });
        return;
      }
      if (this.pwd !== this.repwd) {
        this.$notify.error({
          message: "两次输入的登陆密码不一致",
          title: "错误"
        });
        return;
      }
      if (this.paywd.length !== 6) {
        this.$notify.error({
          message: "支付密码必须为6位",
          title: "错误"
        });
        return;
      } else if (!/\d/.test(this.paywd)) {
        this.$notify.error({
          message: "支付密码必须数字",
          title: "错误"
        });
        return;
      }
      if (this.paywd !== this.repaywd) {
        this.$notify.error({
          message: "两次输入的支付密码不相同",
          title: "错误"
        });
        return;
      }
      if (this.yicon.toLocaleLowerCase() !== this.ycodeObj.alt.toLocaleLowerCase()) {
        this.$notify.error({
          message: "验证码输入错误",
          title: "错误"
        });
        this.changeYcode();
        return;
      }
      if (!this.isChecked) {
        this.$notify.error({
          message: "请阅读并同意《用户协议》！",
          title: "错误"
        });
        return;
      }
      this.$api.post(
        "/userReg",
        {
          phone: this.phone,
          userName: this.userName,
          email: this.email,
          pwd: md5(this.pwd),
          payPwd: md5(this.repaywd)
        },
        res => {
          if (res.status !== 1) {
            this.$notify.error({
              title: "错误",
              message: res.msg
            });
            return;
          }
          this.$message({
            message: "注册成功,正在登录。。。",
            type: "success"
          });
          this.$util.setToken(res.data.token);
          this.$router.replace("user");
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#register {
  background-color: $proBottomBgColor;
  .main {
    width: 892px;
    background-color: #fff;
    margin: 0 auto;
    padding: 21px 0 33px 0;
    // padding: 84px 0;
    .title {
      color: $activeBgColor;
      font-size: $navAndTitleAndSearchFontSize;
      border-bottom: 3px solid $activeBgColor;
      width: calc(100% - 26px);
      padding-left: 26px;
      font-weight: normal;
      height: 46px;
      line-height: 46px;
    }
    .register {
      // width: 446px;
      margin: 38px 0 0 223px;
      > div {
        margin-bottom: 8px;
        width: 100%;
        height: 38px;
        > label {
          float: left;
          height: 38px;
          line-height: 38px;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $activeBgColor;
          width: 105px;
          margin-right: 10px;
        }
        > input {
          float: left;
          height: 38px;
          background-color: $proBottomBgColor;
          color: $topAndNavColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          width: 357px;
          padding-left: 6px;
        }
        .aw_text {
          float: left;
          height: 38px;
          line-height: 38px;
          color: $activeBgColor;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          margin-left: 10px;
          font-style: normal;
          display: none;
        }
      }
      .yicon {
        > input {
          text-align: center;
          width: 112px;
        }
        > span {
          float: left;
          cursor: pointer;
        }
        > span:first-of-type {
          width: 87px;
          height: 38px;
          margin: 0 19px;
          img {
            width: 87px;
            height: 38px;
          }
        }
        > span:last-of-type {
          margin-top: 20px;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
        }
        .aw_text {
          margin-left: 32px;
        }
      }
      .userdeal {
        text-align: center;
        height: 19px;
        line-height: 19px;
        width: 203px;
        margin: 14px 0 29px 121.5px;
        > label {
          height: 19px;
          line-height: 19px;
          width: auto;
          float: left;
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $topAndNavColor;
          cursor: pointer;
        }
        > span {
          display: block;
          height: 14px;
          width: 14px;
          background: url(../assets/images/checkbox_false.png) no-repeat;
          cursor: pointer;
          float: left;
          margin: 2.5px 9px 0 0;
          &.checked{
            background: url(../assets/images/checkbox_true.png) no-repeat;
          }
        }
        > input {
          display: none;
        }
        a {
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          float: left;
          color: $activeBgColor;
        }
      }
      > input {
        width: 391px;
        height: 54px;
        margin: 0 0 45px 52.5px;
        color: #fff;
        font-size: $navAndTitleAndSearchFontSize;
        background-color: $activeBgColor;
        cursor: pointer;
        display: block;
      }
      > p {
        width: calc(100% - 42px);
        padding-left: 42px;
        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        color: $topAndNavColor;
        a {
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          color: $activeBgColor;
        }
      }
    }
  }
}
</style>
