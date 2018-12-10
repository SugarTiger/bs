<template>
    <div>
        <h1 class="title">管理员列表</h1>
        <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出管理员列表</Button>
        <Row :style="{marginTop:'10px'}">
            <Input v-model="searchConName" @on-change="handleSearch" placeholder="请输入关键字搜索..." style="width: 200px" />
            <Button @click="handleCancel" type="ghost" >重置</Button>
        </Row>
        <Row :style="{marginTop:'10px'}">
            <!-- <Table ref="table" :loading="loading"  :border="true" :columns="adminColumns" :data="userList"></Table> -->
            <Row type="flex" justify="center" align="middle" class="headerBox">
              <Col span="3">
                <h3>管理员ID</h3>
              </Col>
              <Col span="4">
                <h3>管理员名</h3>
              </Col>
              <Col span="4">
                <h3>管理员头像</h3>
              </Col>
              <Col span="4">
                <h3>管理员类型</h3>
              </Col>
              <Col span="4">
                <h3>管理员状态</h3>
              </Col>
              <Col span="5">
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
              <Col span="3">
                {{item.admin_id}}
              </Col>
              <Col span="4">
                {{item.admin_name}}
              </Col>
              <Col span="4">
                <Avatar size="large" :src="imgServer+item.admin_header"/>
              </Col>
              <Col span="4">
                {{item.admin_type == 1?'超级管理员':'普通管理员'}}
              </Col>
              <Col span="4">
              <span :style="{color:item.admin_status == 1 ? '#080' : '#bd0007'}">{{item.admin_status == 1 ? "已激活" : "已冻结"}}</span>
              </Col>
              <Col span="5">
                <div class="action">
                  <Button style="margin-top:10px" @click="changeAdminStatue(item)":type='item.admin_status == 1 ? "error" : "info"'>{{item.admin_status == 1 ? "冻结管理员" : "激活管理员"}}</Button>
                </div>
              </Col>
            </Row>
        </Row>
    </div>
</template>
<style lang="less" scoped>
.ivu-avatar-large{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>

<script>
import { imgServer } from "../../libs/globeConfig";
import { search } from "../../libs/tool";
import Cookies from 'js-cookie';
export default {
  name: "adminList",
  data() {
    return {
      loading: true,
      userList: [],
      adminColumns: [
        {
          title: "管理员ID",
          key: "admin_id",
          align: "center",
          width: "80px"
        },
        {
          title: "管理员名",
          key: "admin_name",
          align: "center"
        },
        {
          title: "管理员头像",
          key: "admin_header",
          align: "center",
          render: (h, params) => {
            return h("Avatar", {
              props: {
                src: imgServer + params.row.admin_header,
                size: "large"
              }
            });
          }
        },
        {
          title: "管理员类型",
          key: "admin_type",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.admin_type == 1 ? "超级管理员" : "普通管理员"
            );
          }
        },
        {
          title: "管理员状态",
          key: "admin_status",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: params.row.admin_status == 1 ? "#080" : "#bd0007"
                }
              },
              params.row.admin_status == 1 ? "已激活" : "已冻结"
            );
          }
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
                      type: params.row.admin_status == 1 ? "error" : "info",
                      disabled:params.row.admin_id==Cookies.get("adminId")?true:false
                    },
                    style: {
                      marginTop: "10px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "提示",
                          content: "确定更改管理员状态？",
                          onOk: () => {
                              var status = params.row.admin_status==1?0:1
                              this.changeAdminStatus(params.row.admin_id,status)
                          }
                        });
                      }
                    }
                  },
                  params.row.admin_status == 1 ? "冻结管理员" : "激活管理员"
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
    changeAdminStatue(adminItem){
      this.$Modal.confirm({
                          title: "提示",
                          content: "确定更改管理员状态？",
                          onOk: () => {
                              var status = adminItem.admin_status==1?0:1
                              this.changeAdminStatus(adminItem.admin_id,status)
                          }
                        });
    },
    getUserList() {
      this.axios.get("/getAdminList").then(res => {
        if (res.status === 1) {
          this.userList = res.data;
          this.tempList = res.data;
          this.loading = false;
        }
      });
    },
    exportData() {
      console.log("导出管理员列表");
      this.$refs.table.exportCsv({
        filename: "管理员列表"
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
    },
    changeAdminStatus(adminId,adminStatus){
        this.axios.post("/changeAdminStatus",{
            adminId,
            adminStatus
        }).then(res=>{
            if(res.status===1){
                this.$Message.success("修改成功")
                this.getUserList();
            }
        })
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>