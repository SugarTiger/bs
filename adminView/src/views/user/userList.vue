<template>
    <div>
        <h1 class="title">会员列表</h1>
        <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出用户列表</Button>
        <Row :style="{marginTop:'10px'}">
            <Input v-model="searchConName" @on-change="handleSearch" placeholder="请输入关键字搜索..." style="width: 200px" />
            <Button @click="handleCancel" type="ghost" >重置</Button>
        </Row>
        <Row :style="{marginTop:'10px'}">
            <!-- <Table ref="table" :loading="loading"  :border="true" :columns="userColumns" :data="userList"></Table> -->
          <Row type="flex" justify="center" align="middle" class="headerBox">
            <Col span="2">
              <h3>用户ID</h3>
            </Col>
            <Col span="3">
              <h3>用户名</h3>
            </Col>
            <Col span="3">
              <h3>头像</h3>
            </Col>
            <Col span="1">
              <h3>年龄</h3>
            </Col>
            <Col span="3">
              <h3>注册日期</h3>
            </Col>
            <Col span="2">
              <h3>手机</h3>
            </Col>
            <Col span="4">
              <h3>邮箱</h3>
            </Col>
            <Col span="1">
              <h3>性别</h3>
            </Col>
            <Col span="2">
              <h3>账户余额（元）</h3>
            </Col>
            <Col span="3">
              <h3>操作</h3>
            </Col>
          </Row>
          <Row
              type="flex"
              justify="center"
              align="middle"
              class="dataBox"
              v-for="(item,i) in userList"
          >
            <Col span="2">
            {{item.user_id}}
            </Col>
            <Col span="3">
            {{item.user_name}}
            </Col>
            <Col span="3">
              <Avatar size="large" :src="imgServer+item.user_headurl"></Avatar>
            </Col>
            <Col span="1">
            {{item.user_age}}
            </Col>
            <Col span="3">
              <span>{{item.user_day|Format}}</span>
            </Col>
            <Col span="2">
            {{item.user_phone}}
            </Col>
            <Col span="4">
            {{item.user_email}}
            </Col>
            <Col span="1">
            {{item.user_sex}}
            </Col>
            <Col span="2">
            {{item.user_balance}}
            </Col>
            <Col span="3">
            <div class="action">
              <Button type="info" @click="changeUserMoney(item)">修改用户余额</Button>
            </div>
            </Col>
          </Row>
        </Row>
        <Modal v-model="modal1" title="修改用户余额" @on-ok="send">
                <InputNumber
            style="width: 160px;"
            v-model="yue"></InputNumber>
        </Modal>
    </div>
</template>
<style lang="less" scoped>
.headerBox h3{
  font-size: 12px;
}
.ivu-avatar-large{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>

<script>
import { imgServer } from "../../libs/globeConfig";
import {search} from "../../libs/tool";
export default {
  name: "userList",
  data() {
    return {
      userId:undefined,
      yue:0,
      modal1:false,
      loading: true,
      userList: [],
      userColumns: [
        {
          title: "用户ID",
          key: "user_id",
          align: "center",
          width: "80px"
        },
        {
          title: "用户名",
          key: "user_name",
          align: "center",
          width: "100px"
        },
        {
          title: "用户头像",
          key: "user_headurl",
          align: "center",
          width: "136px",
          render: (h, params) => {
            return h("Avatar", {
              props: {
                src: imgServer + params.row.user_headurl,
                size: "large"
              }
            });
          }
        },
        {
          title: "用户年龄",
          key: "user_age",
          align: "center",
          width: "80px"
        },
        {
          title: "注册日期",
          key: "user_day",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              new Date(params.row.user_day).Format("yyyy-MM-dd hh:mm:ss")
            );
          },
          sortable: true
        },
        {
          title: "用户手机",
          key: "user_phone",
          align: "center"
        },
        {
          title: "用户邮箱",
          key: "user_email",
          align: "center"
        },
        {
          title: "性别",
          key: "user_sex",
          align: "center",
          width: "80px",
          render: (h, params) => {
            return h("span", {}, params.row.user_sex === 1 ? "男" : "女");
          },
          filters: [
            {
              label: "男生",
              value: 1
            },
            {
              label: "女生",
              value: 0
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.user_sex === value;
          }
        },
        {
          title: "账户余额（元）",
          key: "user_balance",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px"
                }
              },
              [
                h(
                  "Button",
                  {
                    props: {
                      type: "info"
                    },
                    style: {
                      marginTop: "10px"
                    },
                    on: {
                      click: () => {
                        this.modal1 = true
                        this.userId  = params.row.user_id
                        this.yue = params.row.user_balance
                      }
                    }
                  },
                  '修改用户余额'
                )
              ]
            );
          }
        }
      ],
      searchConName: "",
      tempList: [],
      imgServer
    };
  },
  methods: {
    changeUserMoney(userInfo){
      this.modal1 = true
      this.userId  = userInfo.user_id;
      this.yue = userInfo.user_balance;
    },
    send(){
      this.axios.post("/updateUserInfo",{
        yue:this.yue,
        userId:this.userId
      }).then(res=>{
        if(res.status===1){
          this.$Message.success("用户余额修改成功")
          this.getUserList()
        }
      })
    },
    getUserList() {
      this.axios.get("/getUserList").then(res => {
        if (res.status === 1) {
          this.userList = res.data;
          this.tempList = res.data;
          this.loading = false;
        }
      });
    },
    exportData() {
      console.log("导出用户数据");
      this.$refs.table.exportCsv({
        filename: "用户列表"
      });
    },
    handleCancel() {
      this.searchConName = "";
      this.userList = this.tempList;
    },
    handleSearch() {
      this.userList = this.tempList;
      if (this.searchConName === "") return;
      this.userList = search(this.userList, this.searchConName);
    }
  },
  mounted() {
    this.getUserList();
  },
  filters:{
    Format(data){
      return new Date(data).Format("yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>