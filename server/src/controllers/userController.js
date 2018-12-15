import {
  wdUser,
  wdOrder
} from '../lib/defineModel';
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))
class UserController {
  // 用户注册
  static async register(ctx) {
    let phone = ctx.request.body.phone,
      userName = ctx.request.body.userName,
      email = ctx.request.body.email,
      pwd = ctx.request.body.pwd,
      payPwd = ctx.request.body.payPwd;
    var userList = await wdUser.findCreateFind({
      where: {
        $or: [{
          user_email: email
        }, {
          user_phone: phone
        }]
      },
      defaults: {
        user_name: userName,
        user_password: pwd,
        user_phone: phone,
        user_email: email,
        user_pay_pwd: payPwd,
        user_balance: 0 //余额
      }
    });
    if (userList[userList.length - 1]) {
      let token = jwt.sign({
        id: userList[0].user_id // 你要保存到token的数据
      }, publicKey, {
        expiresIn: '7d'
      })
      ctx.body = {
        status: 1,
        data: {
          token
        },
        msg: '注册成功'
      }
    } else {
      ctx.body = {
        status: 3,
        data: {},
        msg: '此用户已存在'
      }
    }
  }
  // 用户登录
  static async login(ctx) {
    try {
      let loginName = ctx.request.body.loginName,
        pwd = ctx.request.body.pwd;
      let userItem = await wdUser.findOne({
        where: {
          $or: [{
            user_email: loginName,
            user_password: pwd
          }, {
            user_phone: loginName,
            user_password: pwd
          }]
        }
      });
      console.log("userItem",userItem)
      if (!!userItem) {
        let token = jwt.sign({
          id: userItem.user_id // 你要保存到token的数据
        }, publicKey, {
          expiresIn: '7d'
        })
        ctx.body = {
          status: 1,
          data: {
            token
          },
          msg: '登录成功'
        }
      } else {
        ctx.body = {
          status: 3,
          data: {},
          msg: '密码或用户名错误'
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

  // 修改用户信息
  static async updateUserInfo(ctx) {
    let user_id = ctx.request.body.userId||ctx.token.id,
      user_sex = ctx.request.body.sex,
      user_age = ctx.request.body.age,
      user_password = ctx.request.body.pwd,
      user_pay_pwd = ctx.request.body.paypwd,
      user_balance = ctx.request.body.yue;
    let userInfo = await wdUser.findOne({
      where: {
        user_id
      }
    });
    if (!userInfo) {
      ctx.body = {
        status: 0,
        data: {},
        msg: '此用户不存在'
      }
      return;
    }
    let newValue = {
      user_sex: user_sex || userInfo.user_sex,
      user_age: user_age || userInfo.user_age,
      user_password: user_password || userInfo.user_password,
      user_pay_pwd: user_pay_pwd || userInfo.user_pay_pwd,
      user_balance:user_balance || userInfo.user_balance
    }
    console.log(newValue)
    let updateResutl = await wdUser.update(newValue, {
      where: {
        user_id: user_id
      }
    })
    if(updateResutl[0]===1){
      ctx.body = {
        status:1,
        mag:'修改成功',
        data:updateResutl
      }
      return;
    }
    ctx.body = {
      status:0,
      mag:'错误',
      data:updateResutl
    }
  }

  //获取用户资料
  static async getUserInfo(ctx) {
    try {
      let user_id = ctx.token.id;
      let userInfo = await wdUser.findById(user_id, {
        attributes: {
          exclude: ['user_password', 'user_pay_pwd']
        }
      })
      ctx.body = {
        status: 1,
        data: {
          userInfo
        },
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

  // 获取用户列表
  static async getUserList(ctx) {
    try {
      let userList = await wdUser.findAll({
        attributes: {
          exclude: ['user_password', 'user_pay_pwd']
        }
      })
      ctx.body = {
        status: 1,
        data: userList,
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

  // 用户支付
  static async userPayOrder(ctx) {
    try {
      let orderId = ctx.request.body.orderId,
        payPwd = ctx.request.body.payPwd,
        userId = ctx.token.id
      let userInfo = await wdUser.findOne({
        where: {
          user_id: userId
        }
      })
      let orderInfo = await wdOrder.findOne({
        where: {
          order_id: orderId
        }
      })
      if (userInfo.user_balance < orderInfo.order_total_price) {
        ctx.body = {
          status: 2,
          data: {},
          msg: "账户余额不足，请充值"
        }
        return;
      }
      if(userInfo.user_pay_pwd!==payPwd){
        ctx.body = {
          status: 3,
          data: {},
          msg: "支付密码错误"
        }
        return;
      }
      var money = parseInt(Math.random()*10)+1;
      var totalMoney = orderInfo.order_total_price - money
      var newUserBalance = userInfo.user_balance - totalMoney;
      //扣钱
      let result1 = await wdUser.update({
        user_balance: newUserBalance
      }, {
        where: {
          user_id: userId
        }
      })
      if (result1[0]===1) {
        let result2 = await wdOrder.update({
          order_status: 2,
          order_pay_time:Date.now(),
          Fmoney:money
        }, {
          where: {
            order_id: orderId
          }
        })
        ctx.body = {
          status: 1,
          data: {
            totalMoney,
            money
          },
          result1,
          result2,
          msg: '支付成功'
        }
      }else{
        ctx.body = {
          status: 0,
          data: {},
          msg: '未知错误，请重试'
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
export default UserController;
