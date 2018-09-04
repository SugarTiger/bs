<template>
    <div>
        <h1 class="title">管理员操作日志</h1>
        <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出管理员操作日志</Button>
        <Row :style="{marginTop:'10px'}">
            <Input v-model="searchConName" @on-change="handleSearch" placeholder="请输入关键字搜索..." style="width: 200px" />
            <Button @click="handleCancel" type="ghost" >重置</Button>
        </Row>
        <Row :style="{marginTop:'10px'}">
            <Table ref="table" :loading="loading"  :border="true" :columns="logColumns" :data="logList"></Table>
        </Row>
    </div>
</template>

<script>
import { imgServer } from "../../libs/globeConfig";
import {search} from "../../libs/tool";
export default {
  name: "userList",
  data() {
    return {
      loading: true,
      logList: [],
      logColumns: [
        {
          title: "序号",
          key: "index",
          type: "index",
          align: "center",
          width: "80px"
        },
        {
          title: "管理员名",
          key: "action_admin",
          align: "center",
          width: "100px"
        },
        {
          title: "操作时间",
          key: "action_date",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              new Date(params.row.action_date).Format("yyyy-MM-dd hh:mm:ss")
            );
          },
          sortable: true
        },
        {
          title: "操作事项",
          key: "action_name",
          align: "center"
        }
      ],
      searchConName: "",
      tempList: []
    };
  },
  methods: {
    getActionLog() {
      this.axios.get("/getActionLog").then(res => {
        if (res.status === 1) {
          var list = res.data.reverse()
          this.logList = list;
          this.tempList = list;
          this.loading = false;
        }
      });
    },
    exportData() {
      console.log("管理员操作日志");
      this.$refs.table.exportCsv({
        filename: "管理员操作日志"
      });
    },
    handleCancel() {
      this.searchConName = "";
      this.logList = this.tempList;
    },
    handleSearch() {
      this.logList = this.tempList;
      if (this.searchConName === "") return;
      this.logList = search(this.logList, this.searchConName);
    }
  },
  mounted() {
    this.getActionLog();
  }
};
</script>