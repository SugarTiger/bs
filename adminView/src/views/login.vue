<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import util from "../libs/util";
import { getToken } from "../libs/tool";
import md5 from "md5";
export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.axios
              .post("/adminLogin", {
                admin_name: this.form.userName,
                admin_pwd: md5(this.form.password)
              })
              .then(res => {
                if (res.status === 1) {
                  this.$Message.success(res.msg);
                  this.$store.commit("login", res.data.token);
                  Cookies.set("user", res.data.adminName);
                  Cookies.set("adminId", res.data.adminId);
                  Cookies.set("access", res.data.admin_type==1?1:0);
                  this.$router.replace({
                      name: 'home_index'
                  });
                }
              });
          }else{
              console.error('错误')
          }
        });
    }
  },
  beforeRouteEnter: (to, from, next) => {
    if (getToken()) {
      next(vm => {
        vm.$router.replace({ name: "home_index" });
      });
    } else {
      next();
    }
  }
};
</script>

<style>

</style>
