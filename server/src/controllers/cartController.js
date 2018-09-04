import {
  wdCart,
  wdCartGoods,
  wdGoods
} from '../lib/defineModel';
class cartController {
  static async getCart(ctx) {
    try {
      let cartInfo = await wdCart.findOne({
        where: {
          // user_id: ctx.query.user_id
          user_id: ctx.token.id
        }
      })
      if (!cartInfo) {
        ctx.body = {
          status: 1,
          data: {
            user_id: ctx.token.id,
            cartProList: [],
            qty: 0,
            total: 0
          },
          msg: '获取成功'
        }
        return;
      }
      // ctx.body = {
      //   cartInfo:cartInfo.cart_id
      // }
      // return;
      let cartProList = await wdCartGoods.findAll({
        where: {
          cart_id: cartInfo.cart_id
        }
      })
      cartProList.forEach((pro) => {
        pro.goods_img = pro.goods_img.split(',')
      })
      let data = {
        user_id: ctx.token.id,
        cartProList,
        qty: cartInfo.cart_coods_quantity,
        total: cartInfo.cart_total_prices
      }
      ctx.body = {
        status: 1,
        data,
        msg: '获取购物车成功'
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }

  }
  static async updateCartPro(ctx) {
    try {
      let qty = parseInt(ctx.request.body.qty)
      if (typeof qty !== 'number') {
        ctx.body = {
          status: 0,
          data: {},
          msg: '参数错误'
        }
        return;
      }
      let proInfo = await wdGoods.findById(ctx.request.body.proId);
      let cartInfo = (await wdCart.findCreateFind({
        where: {
          user_id: ctx.token.id,
          cart_id: ctx.token.id
        }
      }))[0]
      let newQty, newTotal;
      if (Number(ctx.request.body.type) === 1) { // 增加数量购物车
        newQty = cartInfo.cart_coods_quantity + qty
        newTotal = cartInfo.cart_total_prices + (qty * proInfo.goods_price)
      } else { //减少数量
        newQty = cartInfo.cart_coods_quantity - qty
        newTotal = cartInfo.cart_total_prices - (qty * proInfo.goods_price)
      }
      console.log("newQty", newQty, "newTotal", newTotal)
      await wdCart.update({
        cart_coods_quantity: newQty,
        cart_total_prices: newTotal
      }, {
        where: {
          user_id: ctx.token.id,
          cart_id: ctx.token.id
        }
      })
      let isHadPro = await wdCartGoods.findOne({
        where: {
          cart_id: ctx.token.id,
          goods_id: proInfo.goods_id
        }
      })
      let result;
      if (!!isHadPro) {
        // 更新关联表
        let newgqty;
        if (Number(ctx.request.body.type) === 1) {
          newgqty = isHadPro.goods_quantity + qty
        } else {
          newgqty = isHadPro.goods_quantity - qty
        }
        result = await wdCartGoods.update({
          goods_quantity: newgqty
        }, {
          where: {
            cart_id: cartInfo.cart_id,
            goods_id: proInfo.goods_id
          }
        })
      } else {
        console.log('不存在')
        result = await wdCartGoods.upsert({
          cart_id: cartInfo.cart_id,
          goods_id: proInfo.goods_id,
          goods_name: proInfo.goods_name,
          goods_type: proInfo.goods_type,
          goods_price: proInfo.goods_price,
          goods_color: proInfo.goods_color,
          goods_img: proInfo.goods_img,
          goods_integral: proInfo.goods_integral,
          goods_capacity: proInfo.goods_capacity,
          goods_quantity: qty //个数
        });
      }
      if (result[0] === 1 || result === true) {
        ctx.body = {
          data: result,
          status: 1,
          msg: '更新购物车成功'
        }
      } else {
        ctx.body = {
          data: result,
          status: 0,
          msg: '更新购物车失败'
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
  static async delCartPro(ctx) {
    try {
      let userId = ctx.token.id;
      let proId = ctx.request.body.proId;
      let cartInfo = await wdCart.findOne({
        where: {
          user_id: userId
        }
      })
      if (!cartInfo) {
        ctx.body = {
          status: 0,
          data: {},
          msg: '无对应购物车'
        }
        return;
      }
      let cartPro = await wdCartGoods.findOne({
        where: {
          cart_id: cartInfo.cart_id,
          goods_id: proId
        }
      })
      if (!cartPro) {
        ctx.body = {
          status: 0,
          data: {},
          msg: '无对应关联表'
        }
        return;
      }
      let cartInfoResult = await wdCart.update({
        cart_coods_quantity: cartInfo.cart_coods_quantity - cartPro.goods_quantity,
        cart_total_prices: cartInfo.cart_total_prices - cartPro.goods_quantity * cartPro.goods_price
      }, {
        where: {
          user_id: userId
        }
      })
      let cartProResult = await wdCartGoods.destroy({
        where: {
          cart_id: cartInfo.cart_id,
          goods_id: proId
        }
      })
      ctx.body = {
        status: 1,
        data: {},
        msg: '删除成功'
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
export default cartController;
