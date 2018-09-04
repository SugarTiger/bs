import {
  wdComment,
  wdUser,
  wdOrder
} from '../lib/defineModel';
class commentController {
  // 获取商品评论
  static async getProComment(ctx) {
    try {
      let proId = ctx.query.proId
      let proComment = await wdComment.findAll({
        where: {
          goods_id: proId
        }
      })
      if (proComment.length > 0) {
        ctx.body = {
          status: 1,
          data: proComment,
          msg: '获取评论成功'
        }
      } else {
        ctx.body = {
          status: 1,
          data: proComment,
          msg: '暂无评论'
        }
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }
  // 编写商品评论
  static async writeProComment(ctx) {
    try {
      var commentObj={};
      Object.assign(commentObj,ctx.request.body,{user_id:ctx.token.id});
      let userInfo = await wdUser.findById(ctx.token.id)
      commentObj.user_headurl = userInfo.user_headurl
      commentObj.user_name = userInfo.user_name
      commentObj.comment_date = Date.now()
      let result = await wdComment.upsert(commentObj)
      let orderInfo = await wdOrder.findById(commentObj.orderId);
      if(orderInfo.order_status==4){
        await wdOrder.update({
          order_status:5,
          order_done_time:Date.now()
        },{
          where: {
            order_id:commentObj.orderId
          }
        })
      }
      ctx.body = {
        status: result ? 1 : 0,
        data: result,
        msg: result ? '编写成功' : '编写失败'
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }

  }
  // 删除商品评论
  static async delProComment(ctx) {
    try {
      let result = await wdComment.destroy({
        where: {
          comment_id: ctx.request.body.commentId
        }
      })
      ctx.body = {
        status: result > 0 ? 1 : 0,
        data: result,
        msg: result > 0 ? '删除成功' : '无对应评论'
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }

  // 获取商品评论列表
  static async getProCommentList(ctx){
    // 获取管理员操作日志
    try{
      let commentList = await wdComment.findAll()
      ctx.body = {
        status: 1,
        data: commentList,
        msg: '获取成功'
      }
    }catch(e){
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }
}

export default commentController;
