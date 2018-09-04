import {
  wdAdmin,
  wdAction
} from '../lib/defineModel';
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))
class adminController {
  // 管理员登录
  static async adminLogin(ctx) {
    let admin_name = ctx.request.body.admin_name,
      admin_pwd = ctx.request.body.admin_pwd;
    try {
      let userItem = await wdAdmin.findOne({
        where: {
          admin_name,
          admin_pwd
        }
      })
      if (!!userItem) {
        if (userItem.admin_status === 0) { //已冻结
          ctx.body = {
            status: 0,
            data: {},
            msg: '此账户已被冻结，请联系超级管理员'
          }
        } else {
          // 管理员登录成功的时候返回token
          let token = jwt.sign({
            id: userItem.admin_id // 你要保存到token的数据
          }, publicKey, {
            expiresIn: '7d'
          })
          ctx.body = {
            status: 1,
            data: {
              token,
              adminName: userItem.admin_name,
              adminId:userItem.admin_id,
              admin_type: userItem.admin_type
            },
            msg: '登录成功'
          }
        }
      } else {
        ctx.body = {
          status: 0,
          data: {},
          msg: '密码或登录名错误'
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

  // 添加管理员
  static async addAdmin(ctx) {
    try {
      if(await wdAdmin.findOne({
        where:{
          admin_name:ctx.request.body.admin_name
        }
      })){
        ctx.body = {
          status: 0,
          data: {},
          msg: '此管理员登录名已存在'
        }
        return;
      }
      if (!ctx.request.body.admin_type) ctx.request.body.admin_type = 0
      let result = await wdAdmin.create(ctx.request.body)
      ctx.body = {
        status: 1,
        data: {},
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

  // 获取管理员信息
  static async getAdminInfo(ctx) {
    try {
      let admin_id = ctx.token.id;
      let adminInfo = await wdAdmin.findById(admin_id, {
        attributes: {
          exclude: ['admin_pwd']
        }
      })
      ctx.body = {
        status: 1,
        data: adminInfo,
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

  // 修改管理员状态
  static async changeAdminStatus(ctx) {
    try{
      let admin_id = ctx.request.body.adminId;
      let admin_status = ctx.request.body.adminStatus
      console.log("admin_id",admin_id)
      console.log("admin_status",admin_status)
      let result = await wdAdmin.update({
        admin_status
      },{
        where:{
          admin_id
        }
      })
      ctx.body = {
        status: 1,
        data: result,
        msg: '修改成功'
      }
    }catch(e){
      ctx.body = {
        status: 0,
        data: e,
        msg: '错误'
      }
    }
  }

  // 获取管理员操作日志
  static async getActionLog(ctx) {
    try {
      let logList = await wdAction.findAll()
      ctx.body = {
        status: 1,
        data: logList,
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

  // 获取管理员列表
  static async getAdminList(ctx) {
    try {
      let adminList = await wdAdmin.findAll({
        attributes: {
          exclude: ['admin_pwd']
        }
      })
      ctx.body = {
        status: 1,
        data: adminList,
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
}
export default adminController;
