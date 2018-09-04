import {
  wdAction
} from "../lib/defineModel"
module.exports = function () {
  return function (ctx, next) {
    if (ctx.request.method !== "POST"&&!ctx.request.header.admin) return next()
    var data = {};
    var url = ctx.request.url
    data.action_admin = ctx.request.header.admin
    switch (true) {
      case (url.indexOf('updateWdInfo')!==-1):
        data.action_name = "修改商城基本信息"
        break;
      case (url.indexOf('addPro')!==-1):
        data.action_name = "添加商品"
        break;
      case (url.indexOf('addAdmin')!==-1):
        data.action_name = "添加管理员"
        break;
      case (url.indexOf('updateProInfo')!==-1):
        data.action_name = "编辑商品"
        break;
      case (url.indexOf('delProComment')!==-1):
        data.action_name = "删除商品评论"
        break;
      case (url.indexOf('updateOrder')!==-1):
        data.action_name = "更新订单（发货）"
        break;
      case (url.indexOf('delAdmin')!==-1):
        data.action_name = "删除管理员"
        break;
      case (url.indexOf('delProComment')!==-1):
        data.action_name = "删除评论"
        break;
      case (url.indexOf('changeAdminStatus')!==-1):
        data.action_name = "操作管理员状态"
        break;
      case (url.indexOf('updateUserInfo')!==-1):
          console.log(ctx.request.body.userId)
          data.action_name = "管理员修改用户余额"
        break;
    }
    if(!!data.action_name)wdAction.create(data)
    return next()
  }
}
