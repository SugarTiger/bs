import {
  wdGoods
} from '../lib/defineModel';
class goodsController {
  // 获取商品详情
  static async getProDetail(ctx) {
    let proId = ctx.query.proId;
    console.log("proId:",proId)
    let proDetail = await wdGoods.findById(proId);
    if (!!proDetail) {
      proDetail.goods_img = proDetail.goods_img.split(',')
      ctx.body = {
        status: 1,
        data: {
          items: proDetail
        },
        msg: '查找成功'
      }
    } else {
      ctx.body = {
        status: 0,
        data: {},
        msg: '此商品不存在'
      }
    }
    // var proDetail = await wdGoods.findOne()
  }

  //获取商品列表，包括搜索商品（根据商品名字）
  static async getProList(ctx) {
    let keyWord = ctx.query.keyWord,
      type = ctx.query.type,
      status = ctx.query.status;
    let proList;
    if (!status&&status!==0) {
      if (!keyWord && !type) {
        proList = await wdGoods.findAll();
      } else if (!keyWord) {
        proList = await wdGoods.findAll({
          where: {
            goods_type: {
              $like: `%${type}%`
            }
          }
        });
      } else if (!type) {
        proList = await wdGoods.findAll({
          where: {
            goods_name: {
              $like: `%${keyWord}%`
            }
          }
        });
      } else {
        proList = await wdGoods.findAll({
          where: {
            goods_name: {
              $like: `%${keyWord}%`
            },
            goods_type: {
              $like: `%${type}%`
            }
          }
        });
      }
    } else {
      if (!keyWord && !type) {
        proList = await wdGoods.findAll({
          where:{
            goods_status:status
          }
        });
      } else if (!keyWord) {
        proList = await wdGoods.findAll({
          where: {
            goods_type: {
              $like: `%${type}%`
            },
            goods_status:status
          }
        });
      } else if (!type) {
        proList = await wdGoods.findAll({
          where: {
            goods_name: {
              $like: `%${keyWord}%`
            },
            goods_status:status
          }
        });
      } else {
        proList = await wdGoods.findAll({
          where: {
            goods_name: {
              $like: `%${keyWord}%`
            },
            goods_type: {
              $like: `%${type}%`
            },
            goods_status:status
          }
        });
      }
    }
    proList.forEach((item)=>{
      item.goods_img = item.goods_img.split(',')
    })
    ctx.body = {
      status: 1,
      data: {
        list: proList
      },
      msg: '查找成功'
    }
    // var proDetail = await wdGoods.findOne()
  }

  // 添加商品
  static async addPro(ctx) {
    try {
      let result = await wdGoods.create(ctx.request.body)
      ctx.body = {
        status: 1,
        data: result,
        msg: '添加成功'
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }

  // 编辑商品
  static async updateProInfo(ctx) {
    try {
      let proId = ctx.request.body.proId;
      for (let key in ctx.request.body) {
        if (ctx.request.body[key] === '') {
          delete ctx.request.body[key]
        }
      }
      let result = await wdGoods.update(ctx.request.body, {
        where: {
          goods_id: proId
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

  static async delPro(ctx){
    try{
      let result = await wdGoods.destroy({
        where: {
          goods_id: ctx.request.body.proId
        }
      })
      ctx.body = {
        status: 1,
        data: result,
        msg: '删除成功'
      }
      return;
      if(!!result){
        ctx.body = {
          status: 1,
          data: result,
          msg: '删除成功'
        }
      }else{
        ctx.body = {
          status: 0,
          data: result,
          msg: '删除失败'
        }
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
export default goodsController;
