import {
  wdInfo
} from '../lib/defineModel';
class wdInfoController {
  // 获取网站信息
  static async getWdInfo(ctx) {
    try{
      let info = await wdInfo.findById(1)
      if(!!info){
        info.info_banner = info.info_banner.split(',')
        info.banner_goods_id = info.banner_goods_id.split(',')
        console.log(info.banner_goods_id)
        ctx.body = {
          status: 1,
          data: info,
          msg: '获取成功'
        }
      }else{
        ctx.body = {
          status: 0,
          data: {},
          msg: '错误'
        }
      }
    }catch(e){
      console.log(e)
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }

  // 修改网站基本信息
  static async updateWdInfo(ctx) {
    try {
      for (let key in ctx.request.body) {
        if (ctx.request.body[key] === '') {
          delete ctx.request.body[key]
        }
      }
      ctx.request.body.info_admin = ctx.token.id
      let result = await wdInfo.update(ctx.request.body, {
        where: {
          info_id: 1
        }
      })
      ctx.body = {
        status: 1,
        data: result,
        msg: '修改成功'
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
export default wdInfoController;
