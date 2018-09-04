module.exports = function () {
  return function (ctx, next) {
    return next().catch((err) => {
      switch (err.status) {
        case 401:
          ctx.status = 200
          ctx.body = {
            status: 401,
            result: {
              err: 'Authentication Error',
              errInfo: 'Protected resource, use Authorization header to get access.'
            },
            msg:'受保护的资源，使用授权标头获取访问权限。'
          }
          break
        default:
          throw err
      }
    })
  }
}
