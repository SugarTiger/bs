import {
  wdAddress
} from '../lib/defineModel';
class addressController {
  // 获取某条收货地址信息
  static async getAddressDetail(ctx) {
    try {
      let user_id = ctx.token.id,
        address_id = ctx.query.addressId;
      let addressInfo = await wdAddress.findOne({
        user_id,
        address_id
      })
      if (!!addressInfo) {
        ctx.body = {
          status: 1,
          data: addressInfo,
          msg: '获取成功'
        }
      } else {
        ctx.body = {
          status: 0,
          data: {},
          msg: '错误'
        }
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }
  // 获取收货地址列表
  static async getAddressList(ctx) {
    try {
      let user_id = ctx.token.id;
      let addressList = await wdAddress.findAll({
        where: {
          user_id
        }
      })
      ctx.body = {
        status: 1,
        data: addressList,
        msg: '获取成功'
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }
  // 添加收货地址
  static async addAddress(ctx) {
    try {
      Object.assign(ctx.request.body, {
        user_id: ctx.token.id
      })
      let result = await wdAddress.create(ctx.request.body)
      if (!!result) {
        ctx.body = {
          status: 1,
          data: result,
          msg: '添加成功'
        }
      } else {
        ctx.body = {
          status: 0,
          data: result,
          msg: '添加失败'
        }
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }
  // 编辑收货地址
  static async updateAddress(ctx) {
    try {
      let user_id = ctx.token.id,
        address_id = ctx.request.body.address_id;
      delete ctx.request.body.userId;
      let result = await wdAddress.update(ctx.request.body, {
        where: {
          user_id,
          address_id
        }
      })
      if (result[0] === 1) {
        ctx.body = {
          status: 1,
          data: result,
          msg: '更新成功'
        }
      } else {
        ctx.body = {
          status: 0,
          data: result,
          msg: '更新失败'
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
  // 删除收货地址
  static async delAddress(ctx) {
    try {
      let user_id = ctx.token.id,
        address_id = ctx.request.body.addressId;
      let result = await wdAddress.destroy({
        where: {
          user_id,
          address_id
        }
      })
      if (!!result) {
        ctx.body = {
          status: 1,
          data: result,
          msg: '删除成功'
        }
      } else {
        ctx.body = {
          status: 0,
          data: result,
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
  static async setDefault(ctx) {
    try {
      let user_id = ctx.token.id,
        address_id = ctx.request.body.addressId;
      let result1 = await wdAddress.update({
        address_default:false
      }, {
        where: {
          user_id
        }
      });
      let result2 = await wdAddress.update({
        address_default:true
      }, {
        where: {
          user_id,
          address_id
        }
      })
      if(result1[0]===1 && result2[0]===1){
        ctx.body={
          status:1,
          data:{},
          msg:'设置成功'
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
}
export default addressController;
