import user from './userController';
import goods from './goodsController';
import admin from './adminController';
import wdInfo from './wdInfoController';
import address from './addressController';
import cart from './cartController';
import comment from './commentController';
import order from './orderController';

module.exports.user = user; //用户模块
module.exports.goods = goods; //商品模块
module.exports.admin = admin; //管理员模块
module.exports.wdInfo = wdInfo; //网站基本信息模块
module.exports.address = address; //收货地址模块
module.exports.cart = cart; //购物车模块
module.exports.comment = comment; //评论模块
module.exports.order = order; //收货地址模块

export let Get = (ctx) => {
  ctx.body = {
    result: 'get',
    name: ctx.params.name,
    para: ctx.query
  }
}

export let Post = async (ctx) => {
  ctx.body = {
    result: 'post',
    name: ctx.params.name,
    para: ctx.request.body
  }
}

export let Put = (ctx) => {
  ctx.body = {
    result: 'put',
    name: ctx.params.name,
    para: ctx.request.body
  }
}

export let Delect = (ctx) => {
  ctx.body = {
    result: 'delect',
    name: ctx.params.name,
    para: ctx.request.body
  }
}
