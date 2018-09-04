import Sequelize from 'sequelize'
import sequelize from './sequelize';

// 用户表
let wdUser = sequelize.define("wd_user", {
  user_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  user_name: Sequelize.STRING(100),
  user_day: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  user_password: Sequelize.STRING(200),
  user_age: Sequelize.INTEGER(11),
  user_phone: Sequelize.STRING(20),
  user_sex: Sequelize.INTEGER(1),
  user_email: Sequelize.STRING(100),
  user_headurl: {
    type: Sequelize.STRING(100),
    defaultValue: '/assets/uploads/header.jpg'
  },
  user_balance: Sequelize.FLOAT,
  user_pay_pwd: Sequelize.STRING(255)
}, {
  freezeTableName: true,
  timestamps: false
})

// 商品表
let wdGoods = sequelize.define("wd_goods", {
  goods_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  goods_name: Sequelize.STRING(100),
  goods_type: Sequelize.STRING(45),
  goods_price: Sequelize.FLOAT,
  goods_color: Sequelize.TEXT,
  goods_sales: {
    type: Sequelize.INTEGER(11),
    defaultValue: 0 //销售额
  },
  goods_marketPrice: Sequelize.FLOAT,
  goods_img: Sequelize.TEXT,
  goods_integral: Sequelize.INTEGER(11),
  goods_details: Sequelize.TEXT,
  goods_capacity: Sequelize.STRING(45),
  goods_inventory:Sequelize.INTEGER(11),
  goods_status: {
    type: Sequelize.INTEGER(1),
    defaultValue: 1 //在售
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// 管理员表
let wdAdmin = sequelize.define("wd_admin", {
  admin_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  admin_type: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0 //一般管理员
  },
  admin_name: Sequelize.STRING(100),
  admin_pwd: Sequelize.STRING(100),
  admin_header: Sequelize.STRING(255),
  admin_status: {
    type: Sequelize.INTEGER(1),
    defaultValue: 1 //已激活状态
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// 收货地址表
let wdAddress = sequelize.define("wd_address", {
  address_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  address_receiver: Sequelize.STRING(10),
  address_area: Sequelize.STRING(10),
  address_details: Sequelize.TEXT(),
  address_phone: Sequelize.STRING(16),
  address_call_phone: Sequelize.STRING(16),
  address_email: Sequelize.STRING(30),
  address_default:{
    type:Sequelize.BOOLEAN,
    defaultValue:false
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    references: {
      model: wdUser,
      key: 'user_id'
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// 购物车表
let wdCart = sequelize.define("wd_cart", {
  cart_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true
  },
  cart_coods_quantity: {
    type: Sequelize.INTEGER(11),
    defaultValue: 0 //默认数量为空
  },
  cart_total_prices: {
    type: Sequelize.FLOAT,
    defaultValue: 0 //默认合计为空
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    references: {
      model: wdUser,
      key: 'user_id'
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// 购物车商品关联表
let wdCartGoods = sequelize.define("wd_cart_goods", {
  cart_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true
  },
  goods_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true
  },
  goods_name: Sequelize.STRING(100),
  goods_type: Sequelize.STRING(45),
  goods_price: Sequelize.FLOAT,
  goods_color: Sequelize.STRING(20),
  goods_img: Sequelize.TEXT,
  goods_integral: Sequelize.INTEGER(11),
  goods_capacity: Sequelize.STRING(45),
  goods_quantity: Sequelize.INTEGER(11)
}, {
  freezeTableName: true,
  timestamps: false
})

// 商品评论表
let wdComment = sequelize.define("wd_comment", {
  comment_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  comment_fraction: Sequelize.INTEGER(11),
  comment_content: Sequelize.TEXT,
  goods_id: {
    type: Sequelize.INTEGER(11),
    references: {
      model: wdGoods,
      key: 'goods_id'
    }
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    references: {
      model: wdUser,
      key: 'user_id'
    }
  },
  comment_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  user_name: Sequelize.STRING(100),
  user_headurl: {
    type: Sequelize.STRING(100),
    defaultValue: '/assets/uploads/header.jpg'
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// 商城基本信息表
let wdInfo = sequelize.define("wd_info", {
  info_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true
  },
  info_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  info_banner: Sequelize.TEXT,
  info_admin: Sequelize.STRING(20),
  info_logo: Sequelize.TEXT,
  info_banner_time: Sequelize.INTEGER(11),
  info_footer: Sequelize.TEXT,
  banner_goods_id:Sequelize.STRING(64)
}, {
  freezeTableName: true,
  timestamps: false
})

// 订单表
let wdOrder = sequelize.define("wd_order", {
  order_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  order_create_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  order_pay_time: Sequelize.DATE,
  order_send_time: Sequelize.DATE,
  order_sh_time: Sequelize.DATE,
  order_done_time: Sequelize.DATE,
  kd_gs: Sequelize.STRING(16),
  Fmoney:Sequelize.INTEGER(4),
  order_wl_num:Sequelize.STRING(32),
  order_postage: {
    type:Sequelize.FLOAT,
    defaultValue:0
  },
  order_writer: Sequelize.STRING(100),
  order_payment: Sequelize.STRING(10),
  order_distribution: Sequelize.STRING(12),
  order_total_price: Sequelize.FLOAT,
  order_note: Sequelize.TEXT,
  order_status: {
    type:Sequelize.INTEGER(1),
    defaultValue:1
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    references: {
      model: wdUser,
      key: 'user_id'
    }
  },
  receiver:Sequelize.STRING(45),
  phone:Sequelize.STRING(20),
  address:Sequelize.STRING(255)
}, {
  freezeTableName: true,
  timestamps: false
})

// 订单商品关联表
let wdOrderGoods = sequelize.define("wd_order_goods", {
  order_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true
  },
  goods_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true
  },
  goods_name: Sequelize.STRING(100),
  goods_type: Sequelize.STRING(45),
  goods_price: Sequelize.FLOAT,
  goods_color: Sequelize.STRING(20),
  goods_img: Sequelize.STRING(12),
  goods_integral: Sequelize.STRING(12),
  goods_capacity: Sequelize.STRING(45),
  goods_quantity: Sequelize.INTEGER(11)
}, {
  freezeTableName: true,
  timestamps: false
})

// 后台管理员操作记录日志
let wdAction = sequelize.define("wd_action", {
  action_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  action_date:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  action_admin:Sequelize.STRING(100),
  action_name:Sequelize.STRING(255)

}, {
  freezeTableName: true,
  timestamps: false
})

module.exports = {
  wdUser,
  wdAdmin,
  wdAddress,
  wdCart,
  wdCartGoods,
  wdComment,
  wdGoods,
  wdInfo,
  wdOrder,
  wdOrderGoods,
  wdAction
}
