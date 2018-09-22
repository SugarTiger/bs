// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import "./assets/styles/comment.scss"
import "./assets/styles/public.scss"
import Http from './utils/http';
import util from './utils/index';
import {imgServer} from './utils/config.js';
Vue.prototype.$api = Http;
Vue.prototype.$util = util;
Vue.config.productionTip = false
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o){
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  }
  return fmt;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted() {
    // 请求网站基本信息
    this.$api.get('/public/getWdInfo', null,  (res)=>{
      res.data.bannerList = [];
      res.data.info_logo = imgServer+res.data.info_logo
      res.data.info_banner.map((img,i)=>{
        res.data.bannerList.push({
          imgUrl:imgServer+img,
          proId:res.data.banner_goods_id[i]
        })
      });
      this.$store.commit('setShopInfo',res.data);
    })
  },
})
