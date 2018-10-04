/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost
 Source Database       : wdshop

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : utf-8

 Date: 10/04/2018 12:43:14 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `wd_action`
-- ----------------------------
DROP TABLE IF EXISTS `wd_action`;
CREATE TABLE `wd_action` (
  `action_id` int(11) NOT NULL AUTO_INCREMENT,
  `action_date` datetime NOT NULL,
  `action_admin` varchar(100) NOT NULL,
  `action_name` varchar(255) NOT NULL,
  PRIMARY KEY (`action_id`)
) ENGINE=MyISAM AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `wd_action`
-- ----------------------------
BEGIN;
INSERT INTO `wd_action` VALUES ('10', '2018-03-29 08:54:01', 'root', '修改商城基本信息'), ('11', '2018-03-30 01:59:41', 'root', '编辑商品'), ('12', '2018-03-30 01:59:47', 'root', '编辑商品'), ('13', '2018-03-30 01:59:48', 'root', '编辑商品'), ('14', '2018-03-30 02:48:39', 'root', '修改商城基本信息'), ('15', '2018-03-30 04:00:06', 'root', '编辑商品'), ('16', '2018-03-30 04:00:28', 'root', '编辑商品'), ('17', '2018-03-30 06:08:40', 'root', '编辑商品'), ('18', '2018-03-30 06:09:02', 'root', '编辑商品'), ('19', '2018-03-30 06:09:26', 'root', '编辑商品'), ('20', '2018-03-30 06:09:39', 'root', '编辑商品'), ('21', '2018-03-30 06:09:54', 'root', '编辑商品'), ('22', '2018-03-30 06:09:59', 'root', '编辑商品'), ('23', '2018-03-30 06:10:00', 'root', '编辑商品'), ('24', '2018-03-30 06:10:01', 'root', '编辑商品'), ('25', '2018-03-30 07:05:17', 'root', '编辑商品'), ('26', '2018-03-30 07:05:19', 'root', '编辑商品'), ('27', '2018-03-30 08:09:18', 'root', '删除商品评论'), ('28', '2018-04-04 08:16:36', 'root', '添加管理员'), ('29', '2018-04-04 08:18:34', 'root', '添加管理员'), ('30', '2018-04-04 08:19:06', 'root', '添加管理员'), ('31', '2018-04-04 08:24:18', 'root', '修改商城基本信息'), ('32', '2018-04-04 08:24:47', 'root', '编辑商品'), ('33', '2018-04-04 08:26:28', 'root', '修改商城基本信息'), ('34', '2018-04-04 08:26:45', 'root', '编辑商品'), ('35', '2018-04-08 15:13:58', 'root', '更新订单（发货）'), ('36', '2018-04-09 13:45:04', 'undefined', '修改商城基本信息'), ('37', '2018-04-09 13:53:24', 'undefined', '修改商城基本信息'), ('38', '2018-04-12 14:52:01', 'undefined', '修改商城基本信息'), ('39', '2018-04-12 15:37:50', 'undefined', '修改商城基本信息'), ('40', '2018-04-12 15:38:04', 'undefined', '修改商城基本信息'), ('41', '2018-04-12 15:38:12', 'undefined', '修改商城基本信息'), ('42', '2018-04-13 13:05:22', 'undefined', '修改商城基本信息'), ('43', '2018-04-13 13:27:28', 'undefined', '编辑商品'), ('44', '2018-04-13 13:58:20', 'undefined', '编辑商品'), ('45', '2018-04-13 16:33:43', 'undefined', '编辑商品'), ('46', '2018-04-13 16:36:55', 'undefined', '编辑商品'), ('47', '2018-04-14 03:45:39', 'undefined', '修改商城基本信息'), ('48', '2018-04-14 03:45:44', 'undefined', '修改商城基本信息'), ('49', '2018-04-14 03:45:48', 'undefined', '修改商城基本信息'), ('50', '2018-04-16 14:10:54', 'root', '更新订单（发货）'), ('51', '2018-04-16 14:12:50', 'root', '更新订单（发货）'), ('52', '2018-04-18 13:48:07', 'root', '修改商城基本信息'), ('53', '2018-04-18 15:46:57', 'root', '修改商城基本信息'), ('54', '2018-04-18 15:55:29', 'root', '更新订单（发货）'), ('55', '2018-04-18 16:39:06', 'root', '添加商品'), ('56', '2018-04-18 16:41:43', 'root', '编辑商品'), ('57', '2018-04-18 16:49:58', 'root', '添加商品'), ('58', '2018-04-18 16:52:38', 'root', '添加商品'), ('59', '2018-04-18 16:54:45', 'root', '添加商品'), ('60', '2018-04-18 16:58:35', 'root', '添加商品'), ('61', '2018-04-18 17:06:20', 'root', '添加商品'), ('62', '2018-04-18 17:07:00', 'root', '编辑商品'), ('63', '2018-04-18 17:09:26', 'root', '编辑商品'), ('64', '2018-04-18 17:14:53', 'root', '添加商品'), ('65', '2018-04-18 17:17:29', 'root', '添加商品'), ('66', '2018-04-18 17:22:25', 'root', '添加商品'), ('67', '2018-04-18 17:23:49', 'root', '添加商品'), ('68', '2018-04-18 17:24:52', 'root', '修改商城基本信息'), ('69', '2018-04-18 17:25:01', 'root', '修改商城基本信息'), ('70', '2018-04-18 17:25:07', 'root', '修改商城基本信息'), ('71', '2018-04-18 17:53:19', 'root', '编辑商品'), ('72', '2018-04-18 18:10:05', 'root', '修改商城基本信息'), ('73', '2018-04-19 04:04:24', 'root', '管理员修改用户余额'), ('74', '2018-04-19 06:15:44', 'root', '编辑商品'), ('75', '2018-04-19 06:16:16', 'root', '编辑商品'), ('76', '2018-04-19 06:16:37', 'root', '编辑商品'), ('77', '2018-04-19 06:17:42', 'root', '编辑商品'), ('78', '2018-04-19 06:18:08', 'root', '编辑商品'), ('79', '2018-04-19 06:52:33', 'root', '修改商城基本信息'), ('80', '2018-04-19 06:59:24', 'root', '更新订单（发货）'), ('81', '2018-09-04 15:18:40', 'root', '管理员修改用户余额'), ('82', '2018-09-04 15:20:22', 'root', '编辑商品'), ('83', '2018-09-04 15:20:25', 'root', '编辑商品'), ('84', '2018-09-04 15:20:36', 'root', '管理员修改用户余额'), ('85', '2018-10-03 17:00:52', 'root', '编辑商品'), ('86', '2018-10-03 17:00:54', 'root', '编辑商品'), ('87', '2018-10-03 17:00:56', 'root', '编辑商品'), ('88', '2018-10-03 17:00:57', 'root', '编辑商品'), ('89', '2018-10-03 17:00:58', 'root', '编辑商品'), ('90', '2018-10-03 17:01:00', 'root', '编辑商品'), ('91', '2018-10-03 17:01:01', 'root', '编辑商品'), ('92', '2018-10-03 17:01:04', 'root', '编辑商品'), ('93', '2018-10-03 17:01:06', 'root', '编辑商品'), ('94', '2018-10-03 17:05:04', 'root', '编辑商品'), ('95', '2018-10-03 17:09:28', 'root', '编辑商品'), ('96', '2018-10-03 17:59:27', 'root', '修改商城基本信息'), ('97', '2018-10-03 17:59:38', 'root', '修改商城基本信息'), ('98', '2018-10-03 17:59:44', 'root', '修改商城基本信息'), ('99', '2018-10-03 17:59:49', 'root', '修改商城基本信息'), ('100', '2018-10-03 18:42:56', 'root', '修改商城基本信息'), ('101', '2018-10-03 18:47:00', 'root', '修改商城基本信息'), ('102', '2018-10-03 18:58:43', 'root', '修改商城基本信息'), ('103', '2018-10-03 19:04:34', 'root', '编辑商品'), ('104', '2018-10-03 19:04:35', 'root', '编辑商品'), ('105', '2018-10-03 19:04:37', 'root', '编辑商品');
COMMIT;

-- ----------------------------
--  Table structure for `wd_address`
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `wd_address`
-- ----------------------------
BEGIN;
INSERT INTO `wd_address` VALUES ('4', '李泽飞', '广东', '广州大学华软软件学院', '13246841799', '', '', '1', '0');
COMMIT;

-- ----------------------------
--  Table structure for `wd_admin`
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `wd_admin`
-- ----------------------------
BEGIN;
INSERT INTO `wd_admin` VALUES ('1', '1', 'root', '63a9f0ea7bb98050796b649e85481845', '/assets/uploads/header.jpg', '1'), ('6', '0', 'admin', '21232f297a57a5a743894a0e4a801fc3', '/assets/uploads/6874249330634292.png', '1');
COMMIT;

-- ----------------------------
--  Table structure for `wd_cart`
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `wd_cart`
-- ----------------------------
BEGIN;
INSERT INTO `wd_cart` VALUES ('1', '0', '0', '1'), ('4', '0', '0', '4');
COMMIT;

-- ----------------------------
--  Table structure for `wd_cart_goods`
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
--  Table structure for `wd_comment`
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
--  Table structure for `wd_goods`
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `wd_goods`
-- ----------------------------
BEGIN;
INSERT INTO `wd_goods` VALUES ('9', 'ASICS亚瑟士新款专业稳定跑鞋男士轻便透气运动鞋T8D0Q-211', '亚瑟士', '599', '白色', '0', '699', '/assets/uploads/7796301169378743.jpg,/assets/uploads/2018459861933808.jpg,/assets/uploads/44239509195943794.jpg,/assets/uploads/6644663450217063.jpg', '10', '<p style=\"text-align: center;\"><img src=\"http://127.0.0.1:3000/assets/uploads/9848784082598123.jpg\" style=\"max-width:100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/2107441784947679.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/2864498029719429.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/5700020180978247.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/5926513894610463.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/24706640943918035.jpg\" style=\"text-align: left; max-width: 100%;\"><img src=\"http://127.0.0.1:3000/assets/uploads/036600541451780044.jpg\" style=\"text-align: left; max-width: 100%;\"><br></p>', '42', '1', '999');
COMMIT;

-- ----------------------------
--  Table structure for `wd_info`
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
--  Records of `wd_info`
-- ----------------------------
BEGIN;
INSERT INTO `wd_info` VALUES ('2018-03-19', '/assets/uploads/650261511599129.jpg,/assets/uploads/7955824374036844.jpg,/assets/uploads/04031371190423205.jpg', '1', '/assets/uploads/640310367472883.png', '3', '京公网安备 11000002000001号京ICP证030173号违法和不良信息举报电话：010-599228223333', '1', '/assets/ad/ad_b.png,/assets/ad/ad_hot.png,/assets/ad/ad_new.png,/assets/ad/ad_t.png', '10,9,11');
COMMIT;

-- ----------------------------
--  Table structure for `wd_order`
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
) ENGINE=InnoDB AUTO_INCREMENT=1234567904 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `wd_order_goods`
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
--  Table structure for `wd_user`
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `wd_user`
-- ----------------------------
BEGIN;
INSERT INTO `wd_user` VALUES ('1', '阿飞', '2018-03-19 18:18:06', '25f9e794323b453885f5181f1b624d0b', '18', '13246841799', '1', '1029109173@qq.com', '/assets/uploads/header.jpg', '95123', 'e10adc3949ba59abbe56e057f20f883e'), ('2', '小k', '2018-03-19 21:07:21', '25f9e794323b453885f5181f1b624d0b', '18', '13246841788', '0', '1029109172@qq.com', '/assets/uploads/11659687.png', '888892', 'e10adc3949ba59abbe56e057f20f883e'), ('3', 'afei22', '2018-04-14 05:59:31', '25f9e794323b453885f5181f1b624d0b', null, '13246841733', null, '1029109178@11.com', '/assets/uploads/header.jpg', '234429', 'e10adc3949ba59abbe56e057f20f883e'), ('4', 'afei22', '2018-10-01 15:43:55', '25d55ad283aa400af464c76d713c07ad', null, '13246841766', null, '1029109178@qq.com', '/assets/uploads/header.jpg', '0', 'e10adc3949ba59abbe56e057f20f883e');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
