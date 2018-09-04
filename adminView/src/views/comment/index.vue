<template>
    <div>
        <h1 class="title">商品评论列表</h1>
        <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出商品评论表</Button>
        <Row :style="{marginTop:'10px'}">
            <Input v-model="searchConName" @on-change="handleSearch" placeholder="请输入关键字搜索..." style="width: 200px" />
            <Button @click="handleCancel" type="ghost" >重置</Button>
        </Row>
        <Row :style="{marginTop:'10px'}">
            <Table ref="table" :loading="loading"  :border="true" :columns="commentColumns" :data="proCommentList"></Table>
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
      commentColumns: [
        {
          title: "评论ID",
          key: "comment_id",
          align: "center",
          width: "80px"
        },
        {
          title: "商品ID",
          key: "goods_id",
          align: "center",
          width: "80px"
        },
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
          title: "评论内容",
          key: "comment_content",
          align: "center"
        },
        {
          title: "评论日期",
          key: "comment_date",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              new Date(params.row.comment_date).Format("yyyy-MM-dd hh:mm:ss")
            );
          },
          sortable: true
        },
        {
          title: "评分",
          key: "comment_fraction",
          align: "center",
          width: "270px",
          render: (h, params) => {
            return h("Rate", {
              props: {
                value: params.row.comment_fraction,
                disabled: true
              }
            });
          },
          filters: [
            {
              label: "1分",
              value: 1
            },
            {
              label: "2分",
              value: 2
            },
            {
              label: "3分",
              value: 3
            },
            {
              label: "4分",
              value: 4
            },
            {
              label: "满分",
              value: 5
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.comment_fraction === value;
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: "90px",
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
                      type: "error"
                    },
                    style: {
                      marginTop: "10px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "提示",
                          content: "确定删除评论？",
                          onOk: () => {
                            this.delComment(params.row.comment_id);
                          }
                        });
                      }
                    }
                  },
                  "删除评论"
                )
              ]
            );
          }
        }
      ],
      searchConName: "",
      tempList: []
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
    delComment(commentId) {
      this.axios
        .post("/delProComment", {
          commentId
        })
        .then(res => {
          if (res.status === 1) {
            this.$Notice.success({
              title: "商品评论删除成功"
            });
            this.getProCommentList();
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