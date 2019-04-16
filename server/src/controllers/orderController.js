import {
  wdOrder,
  wdOrderGoods,
  wdAddress,
  wdGoods,
  wdUser
} from '../lib/defineModel';
class orderController {
  //获取订单列表
  static async getOrderList(ctx) {
    try {
      let type = parseInt(ctx.query.type);
      let orderList;
      if (!type) {
        orderList = await wdOrder.findAll({
          where: {
            user_id: ctx.token.id
          },
          raw: true
        })
      } else {
        orderList = await wdOrder.findAll({
          where: {
            user_id: ctx.token.id,
            order_status: type
          },
          raw: true
        })
      }
      for (let i = 0; i < orderList.length; i++) {
        orderList[i].proList = await wdOrderGoods.findAll({
          where: {
            order_id: orderList[i].order_id
          }
        });
        orderList[i].qty = 0;
        orderList[i].proList.forEach((item)=>{
          orderList[i].qty += item.goods_quantity
          item.goods_img = item.goods_img.split(',')
        })
      }
      ctx.body = {
        status: 1,
        data: orderList,
        msg: '获取成功'
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }

  //获取所有订单列表
  static async getAllOrderList(ctx) {
    try {
      let orderList = await wdOrder.findAll();
      for (let i = 0; i < orderList.length; i++) {
        let userInfo = await wdUser.findById(orderList[i].user_id)
        orderList[i].setDataValue('user_name',userInfo.user_name)
        orderList[i].setDataValue('user_headurl',userInfo.user_headurl)
      }
      ctx.body = {
        status: 1,
        data: orderList,
        msg: '获取成功'
      }

    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }

  //获取订单详情
  static async getOrderDetail(ctx) {
    try {
      let userId = ctx.token.id;
      if(!!ctx.query.userId){
        userId = ctx.query.userId
      }
      let orderId = ctx.query.orderId;
      let orderInfo = await wdOrder.findOne({
        where: {
          user_id: userId,
          order_id: orderId
        }
      })
      let proList = await wdOrderGoods.findAll({
        where: {
          order_id: orderId
        }
      })
      proList.forEach(item=>{
        item.goods_img = item.goods_img.split(',')
      })
      orderInfo.setDataValue('proList',proList);
      ctx.body = {
        status: 1,
        data: orderInfo,
        msg: '获取成功'
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }

  }
  //提交订单
  static async confirmOrder(ctx) {
    // 订单状态order_status
    // 默认是 1 待付款
    //       2 待发货  3 待收货 4 待评论 5 已完成
    try {
      let user_id = ctx.token.id,
        proList = ctx.request.body.proList,
        address_id = ctx.request.body.addressId,
        order_note = ctx.request.body.orderNote,
        order_distribution = ctx.request.body.distribution||0, //订单配送方式 默认为自提
        order_payment = ctx.request.body.payment||0, //订单支付方式  默认为余额支付
        order_postage = ctx.request.body.postage||0, //运费 默认为0
        order_total_price = 0,
        orderProList = [];
      for (let pro of proList) {
        let proDetail = await wdGoods.findById(pro.proId);
        proDetail.goods_quantity = pro.qty
        orderProList.push(
          proDetail
        )
        order_total_price += pro.qty * proDetail.goods_price
        console.log(pro.proId)
      }
      // 收货地址
      let addressInfo = await wdAddress.findOne({
        where:{
          address_id,
          user_id
        }
      })
      // wdOrder表生成订单
      let orderInfo = await wdOrder.create({
        order_note,
        order_total_price,
        user_id,
        receiver:addressInfo.address_receiver,
        phone:addressInfo.address_phone,
        address:addressInfo.address_area+addressInfo.address_details,
        order_distribution,
        order_payment,
        order_postage
      })
      // wdOrderGoods表
      for(let orderPro of orderProList){
        await wdOrderGoods.create({
          order_id:orderInfo.order_id,
          goods_id:orderPro.goods_id,
          goods_name:orderPro.goods_name,
          goods_type:orderPro.goods_type,
          goods_price:orderPro.goods_price,
          goods_color:orderPro.goods_color,
          goods_img:orderPro.goods_img,
          goods_integral:orderPro.goods_integral,
          goods_capacity:orderPro.goods_capacity,
          goods_quantity:orderPro.goods_quantity
        })
      }
      ctx.body = {
        status: 1,
        data:{
          orderInfo,
          orderProList
        },
        msg: '提交成功'
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }
  //删除订单
  static async delOrder(ctx) {
    try {
      let user_id = ctx.token.id;
      if(ctx.request.body.userId){
        user_id = ctx.request.body.userId;
      }
      let order_id = ctx.request.body.orderId;
      let result1 = await wdOrderGoods.destroy({
        where: {
          order_id
        }
      })
      let result2 = await wdOrder.destroy({
        where: {
          user_id,
          order_id
        }
      })
      if (!!result1 && !!result2) {
        ctx.body = {
          status: 1,
          result1,
          result2,
          msg: '删除成功'
        }
      } else {
        ctx.body = {
          status: 0,
          result1,
          result2,
          msg: '删除失败'
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
  //更新订单
  static async updateOrder(ctx) {
    // 默认是 1 待付款
    //       2 待发货  3 待收货 4 待评论 5 已完成
    try {
      let order_id = ctx.request.body.orderId;
      let order_status = ctx.request.body.newStatus;
      var newDate = {order_status};
      if(order_status==3){  //发货
        newDate.order_send_time = Date.now();
        newDate.order_wl_num = ctx.request.body.wlNum;
        newDate.kd_gs = ctx.request.body.kd_gs;
      }else if(order_status==4){
        newDate.order_sh_time = Date.now();
      }else if(order_status==5){
        newDate.order_done_time = Date.now();
      }
      let result = await wdOrder.update(newDate, {
        where: {
          order_id
        }
      })
      ctx.body = {
        status: 1,
        data: result,
        msg: '更新成功'
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }
}
export default orderController;
