// 提取headers里的token
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

module.exports = function () {
  return function (ctx, next) {
    try {
      console.log("path", /public|login|userReg/i.test(ctx.path))
      if (/public|login|userReg|assets|upload/i.test(ctx.path))return next();
      let token = ctx.request.header.authorization //取得token
      let decoded = jwt.verify(token.substr(7), publicKey)
      if (decoded.id) {
        ctx.token = decoded
        return next();
      } else {
        ctx.body = {
          status: 403,
          msg: '没有授权,请重新登录'
        }
      }
    } catch (err) {
      ctx.body = {
        status: 503,
        msg: '解密错误'
      }
    }
  }
}
