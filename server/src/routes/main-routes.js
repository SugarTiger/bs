import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

const router = new KoaRouter()

router
  //用户模块
  .post('/api/userReg',controllers.api.user.register)  //用户注册
  .post('/api/login',controllers.api.user.login)  //用户登录
  .get('/api/getUserInfo',controllers.api.user.getUserInfo)  //获取用户个人信息
  .get('/api/getUserList',controllers.api.user.getUserList)  //获取用户个人信息
  .post('/api/updateUserInfo',controllers.api.user.updateUserInfo)  //用户修改个人信息
  //商品模块
  .get('/api/public/getProDetail',controllers.api.goods.getProDetail)  //获取商品详情public
  .get('/api/public/getProList',controllers.api.goods.getProList)  //获取商品列表public
  .post('/api/addPro',controllers.api.goods.addPro)  //添加商品
  .post('/api/updateProInfo',controllers.api.goods.updateProInfo)  //编辑商品
  .post('/api/delPro',controllers.api.goods.delPro)  //删除商品
  //网站管理员模块
  .post('/api/addAdmin',controllers.api.admin.addAdmin) //添加管理员
  .post('/api/adminLogin',controllers.api.admin.adminLogin) //管理员登录
  .post('/api/changeAdminStatus',controllers.api.admin.changeAdminStatus) //改变管理员状态
  .get('/api/getAdminInfo',controllers.api.admin.getAdminInfo) //获取管理员信息
  .get('/api/getActionLog',controllers.api.admin.getActionLog) //获取管理员操作日志
  .get('/api/getAdminList',controllers.api.admin.getAdminList) //获取管理员列表
  // 网站基本信息模块
  .get('/api/public/getWdInfo',controllers.api.wdInfo.getWdInfo)//获取网站基本信息public
  .post('/api/updateWdInfo',controllers.api.wdInfo.updateWdInfo)//修改网站基本信息
  // 收货地址模块
  .get('/api/getAddressDetail',controllers.api.address.getAddressDetail)//获取某条收货地址信息
  .get('/api/getAddressList',controllers.api.address.getAddressList)//获取收货地址列表
  .post('/api/addAddress',controllers.api.address.addAddress)//添加收货地址
  .post('/api/updateAddress',controllers.api.address.updateAddress)//更新收货地址
  .post('/api/delAddress',controllers.api.address.delAddress)//删除收货地址
  .post('/api/setDefault',controllers.api.address.setDefault)//设置默认地址
  //评论模块
  .get('/api/public/getProComment',controllers.api.comment.getProComment)//获取商品评论public
  .get('/api/getProCommentList',controllers.api.comment.getProCommentList)//获取商品评论public
  .post('/api/writeProComment',controllers.api.comment.writeProComment)//编写商品评论
  .post('/api/delProComment',controllers.api.comment.delProComment)//删除商品评论
  //购物车模块
  .get('/api/getCart',controllers.api.cart.getCart)//获取购物车信息
  .post('/api/updateCartPro',controllers.api.cart.updateCartPro)//更新购物车商品(增加或减少)
  .post('/api/delCartPro',controllers.api.cart.delCartPro)//删除购物车商品
  //订单模块
  .get('/api/getOrderList',controllers.api.order.getOrderList)//获取订单列表
  .get('/api/getAllOrderList',controllers.api.order.getAllOrderList)//获取所有订单列表
  .get('/api/getOrderDetail',controllers.api.order.getOrderDetail)//获取订单详情
  .post('/api/confirmOrder',controllers.api.order.confirmOrder)//确认订单
  .post('/api/delOrder',controllers.api.order.delOrder)//删除订单
  .post('/api/updateOrder',controllers.api.order.updateOrder)//更新订单
  .post('/api/userPayOrder',controllers.api.user.userPayOrder)//支付订单
  // 以/public开头则不用经过权限认证
  .all('/upload', controllers.upload.default)

module.exports = router
