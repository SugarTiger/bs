/*
Navicat MySQL Data Transfer

Source Server         : MySQL
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : wdshop

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-04-11 23:37:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for wd_action
-- ----------------------------
DROP TABLE IF EXISTS `wd_action`;
CREATE TABLE `wd_action` (
  `action_id` int(11) NOT NULL AUTO_INCREMENT,
  `action_date` datetime NOT NULL,
  `action_admin` varchar(100) NOT NULL,
  `action_name` varchar(255) NOT NULL,
  PRIMARY KEY (`action_id`)
) ENGINE=MyISAM AUTO_INCREMENT=142 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_action
-- ----------------------------
INSERT INTO `wd_action` VALUES ('10', '2018-03-29 08:54:01', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('11', '2018-03-30 01:59:41', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('12', '2018-03-30 01:59:47', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('13', '2018-03-30 01:59:48', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('14', '2018-03-30 02:48:39', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('15', '2018-03-30 04:00:06', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('16', '2018-03-30 04:00:28', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('17', '2018-03-30 06:08:40', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('18', '2018-03-30 06:09:02', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('19', '2018-03-30 06:09:26', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('20', '2018-03-30 06:09:39', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('21', '2018-03-30 06:09:54', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('22', '2018-03-30 06:09:59', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('23', '2018-03-30 06:10:00', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('24', '2018-03-30 06:10:01', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('25', '2018-03-30 07:05:17', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('26', '2018-03-30 07:05:19', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('27', '2018-03-30 08:09:18', 'root', '删除商品评论');
INSERT INTO `wd_action` VALUES ('28', '2018-04-04 08:16:36', 'root', '添加管理员');
INSERT INTO `wd_action` VALUES ('29', '2018-04-04 08:18:34', 'root', '添加管理员');
INSERT INTO `wd_action` VALUES ('30', '2018-04-04 08:19:06', 'root', '添加管理员');
INSERT INTO `wd_action` VALUES ('31', '2018-04-04 08:24:18', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('32', '2018-04-04 08:24:47', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('33', '2018-04-04 08:26:28', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('34', '2018-04-04 08:26:45', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('35', '2018-04-08 15:13:58', 'root', '更新订单（发货）');
INSERT INTO `wd_action` VALUES ('36', '2018-04-09 13:45:04', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('37', '2018-04-09 13:53:24', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('38', '2018-04-12 14:52:01', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('39', '2018-04-12 15:37:50', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('40', '2018-04-12 15:38:04', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('41', '2018-04-12 15:38:12', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('42', '2018-04-13 13:05:22', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('43', '2018-04-13 13:27:28', 'undefined', '编辑商品');
INSERT INTO `wd_action` VALUES ('44', '2018-04-13 13:58:20', 'undefined', '编辑商品');
INSERT INTO `wd_action` VALUES ('45', '2018-04-13 16:33:43', 'undefined', '编辑商品');
INSERT INTO `wd_action` VALUES ('46', '2018-04-13 16:36:55', 'undefined', '编辑商品');
INSERT INTO `wd_action` VALUES ('47', '2018-04-14 03:45:39', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('48', '2018-04-14 03:45:44', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('49', '2018-04-14 03:45:48', 'undefined', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('50', '2018-04-16 14:10:54', 'root', '更新订单（发货）');
INSERT INTO `wd_action` VALUES ('51', '2018-04-16 14:12:50', 'root', '更新订单（发货）');
INSERT INTO `wd_action` VALUES ('52', '2018-04-18 13:48:07', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('53', '2018-04-18 15:46:57', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('54', '2018-04-18 15:55:29', 'root', '更新订单（发货）');
INSERT INTO `wd_action` VALUES ('55', '2018-04-18 16:39:06', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('56', '2018-04-18 16:41:43', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('57', '2018-04-18 16:49:58', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('58', '2018-04-18 16:52:38', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('59', '2018-04-18 16:54:45', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('60', '2018-04-18 16:58:35', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('61', '2018-04-18 17:06:20', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('62', '2018-04-18 17:07:00', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('63', '2018-04-18 17:09:26', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('64', '2018-04-18 17:14:53', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('65', '2018-04-18 17:17:29', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('66', '2018-04-18 17:22:25', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('67', '2018-04-18 17:23:49', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('68', '2018-04-18 17:24:52', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('69', '2018-04-18 17:25:01', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('70', '2018-04-18 17:25:07', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('71', '2018-04-18 17:53:19', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('72', '2018-04-18 18:10:05', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('73', '2018-04-19 04:04:24', 'root', '管理员修改用户余额');
INSERT INTO `wd_action` VALUES ('74', '2018-04-19 06:15:44', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('75', '2018-04-19 06:16:16', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('76', '2018-04-19 06:16:37', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('77', '2018-04-19 06:17:42', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('78', '2018-04-19 06:18:08', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('79', '2018-04-19 06:52:33', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('80', '2018-04-19 06:59:24', 'root', '更新订单（发货）');
INSERT INTO `wd_action` VALUES ('81', '2018-09-04 15:18:40', 'root', '管理员修改用户余额');
INSERT INTO `wd_action` VALUES ('82', '2018-09-04 15:20:22', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('83', '2018-09-04 15:20:25', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('84', '2018-09-04 15:20:36', 'root', '管理员修改用户余额');
INSERT INTO `wd_action` VALUES ('85', '2018-10-03 17:00:52', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('86', '2018-10-03 17:00:54', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('87', '2018-10-03 17:00:56', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('88', '2018-10-03 17:00:57', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('89', '2018-10-03 17:00:58', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('90', '2018-10-03 17:01:00', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('91', '2018-10-03 17:01:01', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('92', '2018-10-03 17:01:04', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('93', '2018-10-03 17:01:06', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('94', '2018-10-03 17:05:04', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('95', '2018-10-03 17:09:28', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('96', '2018-10-03 17:59:27', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('97', '2018-10-03 17:59:38', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('98', '2018-10-03 17:59:44', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('99', '2018-10-03 17:59:49', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('100', '2018-10-03 18:42:56', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('101', '2018-10-03 18:47:00', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('102', '2018-10-03 18:58:43', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('103', '2018-10-03 19:04:34', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('104', '2018-10-03 19:04:35', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('105', '2018-10-03 19:04:37', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('106', '2018-10-04 08:11:46', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('107', '2018-10-04 08:11:52', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('108', '2018-10-04 08:12:11', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('109', '2018-10-04 08:12:13', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('110', '2018-10-04 08:31:34', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('111', '2018-10-04 08:31:40', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('112', '2018-10-04 08:49:09', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('113', '2018-10-04 08:49:22', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('114', '2018-10-04 08:49:32', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('115', '2018-10-04 08:50:21', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('116', '2018-10-04 08:50:48', 'root', '操作管理员状态');
INSERT INTO `wd_action` VALUES ('117', '2018-10-04 08:50:54', 'root', '操作管理员状态');
INSERT INTO `wd_action` VALUES ('118', '2018-10-04 08:52:07', 'root', '添加管理员');
INSERT INTO `wd_action` VALUES ('119', '2018-10-04 08:52:53', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('120', '2018-10-04 08:52:59', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('121', '2018-10-04 08:53:06', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('122', '2018-10-04 08:53:21', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('123', '2018-10-04 08:53:35', 'root', '修改商城基本信息');
INSERT INTO `wd_action` VALUES ('124', '2018-10-04 08:53:50', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('125', '2018-10-04 08:53:51', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('126', '2018-10-04 08:54:34', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('127', '2018-10-04 09:03:59', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('128', '2018-10-04 09:04:18', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('129', '2018-10-04 09:04:47', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('130', '2018-10-04 09:07:37', 'root', '添加管理员');
INSERT INTO `wd_action` VALUES ('131', '2018-10-04 09:08:13', 'root', '操作管理员状态');
INSERT INTO `wd_action` VALUES ('132', '2018-12-15 08:31:19', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('133', '2018-12-15 08:31:46', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('134', '2018-12-15 08:32:18', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('135', '2019-01-08 16:26:05', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('136', '2019-01-08 16:26:16', 'root', '编辑商品');
INSERT INTO `wd_action` VALUES ('137', '2019-01-08 16:27:49', 'root', '添加商品');
INSERT INTO `wd_action` VALUES ('138', '2019-01-08 16:28:13', 'root', '管理员修改用户余额');
INSERT INTO `wd_action` VALUES ('139', '2019-01-08 16:28:27', 'root', '操作管理员状态');
INSERT INTO `wd_action` VALUES ('140', '2019-01-08 16:28:30', 'root', '操作管理员状态');
INSERT INTO `wd_action` VALUES ('141', '2019-02-20 16:19:04', 'root', '更新订单（发货）');

-- ----------------------------
-- Table structure for wd_address
-- ----------------------------
DROP TABLE IF EXISTS `wd_address`;
CREATE TABLE `wd_address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `address_receiver` char(10) NOT NULL,
  `address_area` char(10) NOT NULL,
  `address_details` text NOT NULL,
  `address_phone` varchar(16) NOT NULL,
  `address_call_phone` varchar(16) DEFAULT NULL,
  `address_email` char(30) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `address_default` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `fk_wd_ address_wd_user1` (`user_id`),
  CONSTRAINT `fk_wd_ address_wd_user1` FOREIGN KEY (`user_id`) REFERENCES `wd_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_address
-- ----------------------------
INSERT INTO `wd_address` VALUES ('4', '测试员1', '广东', '广州大学华软软件学院', '13246851899', '010081542', '123456789@qq.com', '1', '0');
INSERT INTO `wd_address` VALUES ('7', '测试员2', '广东', '广州大学华软软件学院', '13245841899', '', '', '1', '0');

-- ----------------------------
-- Table structure for wd_admin
-- ----------------------------
DROP TABLE IF EXISTS `wd_admin`;
CREATE TABLE `wd_admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_type` varchar(100) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_pwd` varchar(100) NOT NULL,
  `admin_header` varchar(255) DEFAULT NULL,
  `admin_status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_admin
-- ----------------------------
INSERT INTO `wd_admin` VALUES ('1', '1', 'root', '63a9f0ea7bb98050796b649e85481845', '/assets/uploads/header.jpg', '1');
INSERT INTO `wd_admin` VALUES ('6', '0', 'admin', '21232f297a57a5a743894a0e4a801fc3', '/assets/uploads/6874249330634292.png', '1');
INSERT INTO `wd_admin` VALUES ('7', '0', 'test001', '098f6bcd4621d373cade4e832627b4f6', '/assets/uploads/8542252702695801.png', '1');
INSERT INTO `wd_admin` VALUES ('8', '0', 'test004', 'e10adc3949ba59abbe56e057f20f883e', '/assets/uploads/23601587558837966.png', '0');

-- ----------------------------
-- Table structure for wd_cart
-- ----------------------------
DROP TABLE IF EXISTS `wd_cart`;
CREATE TABLE `wd_cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_coods_quantity` int(11) NOT NULL,
  `cart_total_prices` float NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_wd_cart_wd_user1` (`user_id`),
  CONSTRAINT `fk_wd_cart_wd_user1` FOREIGN KEY (`user_id`) REFERENCES `wd_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_cart
-- ----------------------------
INSERT INTO `wd_cart` VALUES ('1', '3', '3352', '1');

-- ----------------------------
-- Table structure for wd_cart_goods
-- ----------------------------
DROP TABLE IF EXISTS `wd_cart_goods`;
CREATE TABLE `wd_cart_goods` (
  `cart_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `goods_name` varchar(100) NOT NULL,
  `goods_type` varchar(45) NOT NULL,
  `goods_price` float NOT NULL,
  `goods_color` char(20) NOT NULL,
  `goods_img` text NOT NULL,
  `goods_integral` int(11) NOT NULL,
  `goods_capacity` varchar(45) NOT NULL,
  `goods_quantity` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`cart_id`,`goods_id`),
  KEY `fk_wd_cart_has_wd_goods_wd_goods1` (`goods_id`),
  KEY `fk_wd_cart_has_wd_goods_wd_cart1` (`cart_id`),
  CONSTRAINT `fk_wd_cart_has_wd_goods_wd_cart1` FOREIGN KEY (`cart_id`) REFERENCES `wd_cart` (`cart_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_wd_cart_has_wd_goods_wd_goods1` FOREIGN KEY (`goods_id`) REFERENCES `wd_goods` (`goods_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_cart_goods
-- ----------------------------
INSERT INTO `wd_cart_goods` VALUES ('1', '22', '阿迪达斯官方 neo 男女 CLEAN 休闲鞋', '阿迪达斯', '628', '黑色', '/assets/uploads/0402.jpg,/assets/uploads/0401.jpg,/assets/uploads/0403.jpg', '10', '42', '2');
INSERT INTO `wd_cart_goods` VALUES ('1', '23', 'test222', '阿迪达斯', '299', '黑色', '/assets/uploads/37710045254842917.jpg', '0', '42', '1');

-- ----------------------------
-- Table structure for wd_comment
-- ----------------------------
DROP TABLE IF EXISTS `wd_comment`;
CREATE TABLE `wd_comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_fraction` int(5) NOT NULL,
  `comment_content` text,
  `goods_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_date` datetime NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_headurl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_wd_comment_wd_goods1` (`goods_id`),
  KEY `fk_wd_comment_wd_user1` (`user_id`),
  CONSTRAINT `fk_wd_comment_wd_goods1` FOREIGN KEY (`goods_id`) REFERENCES `wd_goods` (`goods_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_wd_comment_wd_user1` FOREIGN KEY (`user_id`) REFERENCES `wd_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_comment
-- ----------------------------

-- ----------------------------
-- Table structure for wd_goods
-- ----------------------------
DROP TABLE IF EXISTS `wd_goods`;
CREATE TABLE `wd_goods` (
  `goods_id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(100) NOT NULL,
  `goods_type` varchar(45) NOT NULL,
  `goods_price` float NOT NULL,
  `goods_color` text NOT NULL,
  `goods_sales` int(11) NOT NULL,
  `goods_marketPrice` float NOT NULL,
  `goods_img` text NOT NULL,
  `goods_integral` int(11) NOT NULL,
  `goods_details` text NOT NULL,
  `goods_capacity` varchar(45) NOT NULL,
  `goods_status` int(1) NOT NULL DEFAULT '1',
  `goods_inventory` int(11) NOT NULL,
  PRIMARY KEY (`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_goods
-- ----------------------------
INSERT INTO `wd_goods` VALUES ('9', 'ASICS亚瑟士新款专业稳定跑鞋男士轻便透气运动鞋T8D0Q-211', '亚瑟士', '599', '白色', '0', '6996', '/assets/uploads/7796301169378743.jpg,/assets/uploads/2018459861933808.jpg,/assets/uploads/6644663450217063.jpg', '100', '<p style=\"text-align: center;\"><img src=\"http://127.0.0.1:3000/assets/uploads/9848784082598123.jpg\" style=\"max-width:100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/2107441784947679.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/2864498029719429.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/5700020180978247.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/5926513894610463.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/24706640943918035.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/036600541451780044.jpg\" style=\"text-align: left; max-width: 100%;\"><br></p>', '44', '1', '999');
INSERT INTO `wd_goods` VALUES ('19', 'test002', '亚瑟士', '588', '黑色', '0', '688', '/assets/uploads/8871996699841791.jpg,/assets/uploads/7110784872175782.jpg,/assets/uploads/13439335722082535.jpg,/assets/uploads/2876969138612224.jpg', '10', '<p><img src=\"http://127.0.0.1:3000/assets/uploads/08980468366860395.jpg\" style=\"max-width:100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/2680361115705969.jpg\" style=\"max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/5940700071613287.jpg\" style=\"max-width: 100%;\"><br></p>', '44', '0', '999');
INSERT INTO `wd_goods` VALUES ('20', 'Nike 耐克官方NIKE EBERNON LOW 男子运动鞋AQ1775', '耐克', '1280', '白色', '0', '1390', '/assets/uploads/0501.jpg,/assets/uploads/0502.jpg,/assets/uploads/0503.jpg', '11', '<p><img src=\"http://127.0.0.1:3000/assets/uploads/0504.jpg\" style=\"max-width:100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/0505.jpg\" style=\"max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/0506.jpg\" style=\"max-width: 100%;\"><br></p>', '42', '1', '999');
INSERT INTO `wd_goods` VALUES ('21', '阿迪达斯官方三叶草Solar HU NMD男子经典鞋BB9527 BB9528 BB9531', '阿迪达斯', '1888', '红色', '90', '1899', '/assets/uploads/0302.jpg,/assets/uploads/0301.jpg,/assets/uploads/0303.jpg', '12', '100%;\"><br></p>', '43', '1', '999');
INSERT INTO `wd_goods` VALUES ('22', '阿迪达斯官方 neo 男女 CLEAN 休闲鞋', '阿迪达斯', '628', '黑色', '1', '688', '/assets/uploads/0402.jpg,/assets/uploads/0401.jpg,/assets/uploads/0403.jpg', '10', '100%;\"><br></p>', '42', '1', '888');
INSERT INTO `wd_goods` VALUES ('23', 'test222', '阿迪达斯', '299', '黑色', '0', '399', '/assets/uploads/37710045254842917.jpg', '0', '<p>测试十四房贷首付士大夫士大夫反抗精神的克里夫</p>', '42', '1', '100');

-- ----------------------------
-- Table structure for wd_info
-- ----------------------------
DROP TABLE IF EXISTS `wd_info`;
CREATE TABLE `wd_info` (
  `info_date` date NOT NULL,
  `info_banner` text NOT NULL,
  `info_admin` char(20) NOT NULL,
  `info_logo` text NOT NULL,
  `info_banner_time` int(11) NOT NULL,
  `info_footer` text,
  `info_id` int(11) NOT NULL AUTO_INCREMENT,
  `advertising` text,
  `banner_goods_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_info
-- ----------------------------
INSERT INTO `wd_info` VALUES ('2018-03-19', '/assets/uploads/650261511599129.jpg,/assets/uploads/7955824374036844.jpg,/assets/uploads/02520509167109597.jpg', '1', '/assets/uploads/08881343268700848.png', '3', '地址：广东省广州市从化区经济开发区高技术产业园广从南路548号 | 电话：020－87818918 传真：87818020 邮编：510990 | 网站公安备案编号：4401840100050 ', '1', '/assets/ad/ad_b.png,/assets/ad/ad_hot.png,/assets/ad/ad_new.png,/assets/ad/ad_t.png', '9,9,9');

-- ----------------------------
-- Table structure for wd_order
-- ----------------------------
DROP TABLE IF EXISTS `wd_order`;
CREATE TABLE `wd_order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_create_time` datetime NOT NULL,
  `order_pay_time` datetime DEFAULT NULL,
  `order_postage` float DEFAULT NULL,
  `order_writer` varchar(100) DEFAULT NULL,
  `order_payment` char(10) NOT NULL,
  `order_distribution` char(12) NOT NULL,
  `order_total_price` float NOT NULL,
  `order_note` text,
  `order_status` int(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `receiver` varchar(45) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `order_send_time` datetime DEFAULT NULL,
  `order_done_time` datetime DEFAULT NULL,
  `order_wl_num` varchar(32) DEFAULT NULL,
  `kd_gs` varchar(16) DEFAULT NULL,
  `Fmoney` int(4) DEFAULT NULL,
  `order_sh_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_wd_order_wd_user` (`user_id`),
  CONSTRAINT `fk_wd_order_wd_user` FOREIGN KEY (`user_id`) REFERENCES `wd_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_order
-- ----------------------------
INSERT INTO `wd_order` VALUES ('2', '2019-01-08 16:23:03', '2019-01-08 16:23:14', '0', null, '0', '0', '1280', '', '4', '1', '测试员1', '13246851899', '广东广州大学华软软件学院', '2019-02-20 16:19:04', null, '21233153454153531', '中通', '1', '2019-02-20 16:19:16');
INSERT INTO `wd_order` VALUES ('3', '2019-02-20 14:42:49', '2019-02-20 15:15:20', '0', null, '0', '0', '599', '', '2', '1', '测试员1', '13246851899', '广东广州大学华软软件学院', null, null, null, null, '9', null);
INSERT INTO `wd_order` VALUES ('4', '2019-03-07 15:58:26', '2019-03-07 15:58:31', '0', null, '0', '0', '1797', '', '2', '1', '测试员1', '13246851899', '广东广州大学华软软件学院', null, null, null, null, '10', null);

-- ----------------------------
-- Table structure for wd_order_goods
-- ----------------------------
DROP TABLE IF EXISTS `wd_order_goods`;
CREATE TABLE `wd_order_goods` (
  `order_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `goods_name` varchar(100) NOT NULL,
  `goods_type` varchar(45) NOT NULL,
  `goods_price` float NOT NULL,
  `goods_color` char(20) NOT NULL,
  `goods_img` text NOT NULL,
  `goods_integral` varchar(45) NOT NULL,
  `goods_capacity` varchar(45) NOT NULL,
  `goods_quantity` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`goods_id`),
  KEY `fk_wd_order_has_wd_goods_wd_goods1` (`goods_id`),
  KEY `fk_wd_order_has_wd_goods_wd_order1` (`order_id`),
  CONSTRAINT `fk_wd_order_has_wd_goods_wd_goods1` FOREIGN KEY (`goods_id`) REFERENCES `wd_goods` (`goods_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_wd_order_has_wd_goods_wd_order1` FOREIGN KEY (`order_id`) REFERENCES `wd_order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_order_goods
-- ----------------------------
INSERT INTO `wd_order_goods` VALUES ('2', '20', 'Nike 耐克官方NIKE EBERNON LOW 男子运动鞋AQ1775', '耐克', '1280', '白色', '/assets/uploads/0501.jpg,/assets/uploads/0502.jpg,/assets/uploads/0503.jpg', '11', '42', '1');
INSERT INTO `wd_order_goods` VALUES ('3', '9', 'ASICS亚瑟士新款专业稳定跑鞋男士轻便透气运动鞋T8D0Q-211', '亚瑟士', '599', '白色', '/assets/uploads/7796301169378743.jpg,/assets/uploads/2018459861933808.jpg,/assets/uploads/6644663450217063.jpg', '100', '44', '1');
INSERT INTO `wd_order_goods` VALUES ('4', '9', 'ASICS亚瑟士新款专业稳定跑鞋男士轻便透气运动鞋T8D0Q-211', '亚瑟士', '599', '白色', '/assets/uploads/7796301169378743.jpg,/assets/uploads/2018459861933808.jpg,/assets/uploads/6644663450217063.jpg', '100', '44', '3');

-- ----------------------------
-- Table structure for wd_user
-- ----------------------------
DROP TABLE IF EXISTS `wd_user`;
CREATE TABLE `wd_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_day` datetime NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_age` int(11) DEFAULT NULL,
  `user_phone` varchar(20) NOT NULL,
  `user_sex` int(1) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_headurl` varchar(100) DEFAULT NULL,
  `user_balance` float NOT NULL,
  `user_pay_pwd` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_user
-- ----------------------------
INSERT INTO `wd_user` VALUES ('1', 'test001', '2018-03-19 18:18:06', 'e10adc3949ba59abbe56e057f20f883e', '18', '13246851899', '1', '123456789@qq.com', '/assets/uploads/header.jpg', '97622', 'e10adc3949ba59abbe56e057f20f883e');
