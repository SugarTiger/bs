<style lang="less">
@import "./home.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title">
                                <Icon type="person"></Icon>
                                当前管理员
                            </p>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" :src="header" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">{{name}}</b>
                                            <p>{{type==1?'超级管理员':'普通管理员'}}</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <!-- <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                            </Row> -->
                            <!-- <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">广州</Col>
                            </Row> -->
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
import { imgServer } from "../../libs/globeConfig";
export default {
  name: "home",
  data() {
    return {
      name: "",
      type: "",
      header:""
    };
  },
  mounted() {
    this.axios.get("/getAdminInfo").then(res => {
    if(res.status===401){
        this.$store.commit("logout");
        this.$router.push({path: '/login'})
    }else{
        this.name = res.data.admin_name;
        this.type = res.data.admin_type;
        this.header = imgServer+res.data.admin_header;
    }
    });
  }
};
</script>
