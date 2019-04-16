<template>
    <div>
        <h1 class="title">商品评论列表</h1>
        <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出商品评论表</Button>
        <Row :style="{marginTop:'10px'}">
            <Input v-model="searchConName" @on-change="handleSearch" placeholder="请输入关键字搜索..." style="width: 200px" />
            <Button @click="handleCancel" type="ghost" >重置</Button>
        </Row>
        <Row :style="{marginTop:'10px'}">
            <!-- <Table ref="table" :loading="loading"  :border="true" :columns="commentColumns" :data="proCommentList"></Table> -->
          <Row type="flex" justify="center" align="middle" class="headerBox">
            <Col span="1">
              <h3>评论ID</h3>
            </Col>
            <Col span="2">
              <h3>商品ID</h3>
            </Col>
            <Col span="2">
              <h3>用户ID</h3>
            </Col>
            <Col span="2">
              <h3>用户名</h3>
            </Col>
            <Col span="3">
              <h3>用户头像</h3>
            </Col>
            <Col span="5">
              <h3>评论内容</h3>
            </Col>
            <Col span="4">
              <h3>评论日期</h3>
            </Col>
            <Col span="2">
              <h3>评分</h3>
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
              v-for="(item,i) in proCommentList"
          >
            <Col span="1">
            {{item.comment_id}}
            </Col>
            <Col span="2">
            {{item.goods_id}}
            </Col>
            <Col span="2">
            {{item.user_id}}
            </Col>
            <Col span="2">
              {{item.user_name}}
            </Col>
            <Col span="3">
            <Avatar size="large" :src="imgServer+item.user_headurl"></Avatar>
            </Col>
            <Col span="5">
            {{item.comment_content}}
            </Col>
            <Col span="4">
            <span>{{item.comment_date|Format}}</span>
            </Col>
            <Col span="2">
            {{item.comment_fraction}}
            </Col>
            <Col span="3">
            <div class="action">
              <Button type="error" @click="delComment(item)">删除评论</Button>
            </div>
            </Col>
          </Row>
        </Row>
    </div>
</template>

<script>
import { imgServer } from "../../libs/globeConfig";
import {search} from "../../libs/tool";
export default {
  name: "comment",
  data() {
    return {
      loading: true,
      proCommentList: [],
      searchConName: "",
      tempList: [],
      imgServer
    };
  },
  methods: {
    getProCommentList() {
      this.axios.get("/getProCommentList").then(res => {
        if (res.status === 1) {
          this.proCommentList = res.data;
          this.tempList = res.data;
          this.loading = false;
        }
      });
    },
    exportData() {
      console.log("导出商品评论表");
      this.$refs.table.exportCsv({
        filename: "商品评论表"
      });
    },
    delComment(item) {
      this.$Modal.confirm({
                          title: "提示",
                          content: "确定删除评论？",
                          onOk: () => {
            this.axios
        .post("/delProComment", {
          commentId:item.comment_id
        })
        .then(res => {
          if (res.status === 1) {
            this.$Notice.success({
              title: "商品评论删除成功"
            });
            this.getProCommentList();
          }
        });
                          }
                        });
    },
    handleCancel() {
      this.searchConName = "";
      this.proCommentList = this.tempList;
    },
    handleSearch() {
      this.proCommentList = this.tempList;
      if (this.searchConName === "") return;
      this.proCommentList = search(
        this.proCommentList,
        this.searchConName
      );
    }
  },
  mounted() {
    this.getProCommentList();
  }
};
</script>