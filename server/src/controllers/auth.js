import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

/**
 * 检查授权是否合法
 */
export let CheckAuth = (ctx) => {
  let token = ctx.request.header.authorization
  console.log('token??')
  try {
    let decoded = jwt.verify(token.substr(7), publicKey)
    if (decoded.adminId) {
      return {
        status: 1,
        result: decoded.adminId
      }
    } else {
      return {
        status: 403,
        result: {
          errInfo: '没有授权'
        }
      }
    }
  } catch (err) {
    return {
      status: 503,
      result: {
        errInfo: '解密错误'
      }
    }
  }
}

export let Post = (ctx) => {
  return CheckAuth(ctx).then(result => { ctx.body = result })
}
