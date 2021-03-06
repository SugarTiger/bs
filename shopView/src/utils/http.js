import utils from './index';
import {Message} from 'element-ui';
var Http = function () {
  this.type = 'GET';
  this.baseUrl = 'http://127.0.0.1:3000/api';
}
Http.prototype.ajax = function (url, data, ons) {
  if (!data) {
      data = {}
  }
  $.ajax({
      url: this.baseUrl + url,
      type: this.type,
      data: data,
      dataType: 'json',
      timeout: 6 * 10000,
      beforeSend: function (xhr) {
          var token = utils.getToken()
          if (!!token) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + token)
          }
      },
      success: function (result, status, xhr) {
          console.log(result)
          if (result.status !== 0) {
              if (ons) ons(result)
          } else {
            Message.error('服务端出错，请联系管理员！')
          }
      },
      error: function (e) {
          console.error(e)
          Message.error('网络出错，请稍后重试')
      }
  })
}
Http.prototype.get = function (url, data, ons) {
  this.type = 'GET';
  this.ajax(url, data, ons);
}
Http.prototype.post = function (url, data, ons) {
  this.type = 'POST';
  this.ajax(url, data, ons);
}
export default new Http();
