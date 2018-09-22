function getsec(time) { //转换时间，单位为小时3
  return time * 60 * 60 * 1000
}
// 写 cookies
function setCookie(name, value, time) {
  if (time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + parseInt(strsec));
    document.cookie = name +
      "=" +
      escape(value) +
      ";expires=" +
      exp.toGMTString();
  } else {
    document.cookie = name + "=" + escape(value);
  }
}
// 读 cookies
function getCookie(name) {
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  var arr = document.cookie.match(reg);
  return arr ? unescape(arr[2]) : null;
}

// 删 cookies
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}
export default {
  // 更新验证码
  getYM() {
    var c = document.createElement('canvas');
    c.weight = 400;
    c.height = 200;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#BFEFFF"; //绘制背景颜色
    ctx.fillRect(0, 0, 400, 200);
    //随机产生4个字符
    var s = '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM';
    var len = s.length;
    var chars = [];
    for (var i = 0; i < 4; i++) {
      var start = parseInt(Math.random() * len)
      chars.push(s.slice(start, start + 1));
    }
    ctx.font = "80px Verdana";
    var x = 20;
    var colors = ['red', 'yellow', 'blue', 'green', 'pink', 'black'];
    //绘制4个字符
    for (i = 0; i < 4; i++) {
      ctx.fillStyle = colors[Math.floor(Math.random() * 5)];
      ctx.fillText(chars[i], x, 70 + Math.floor(Math.random() * 130));
      x = x + 60;
    }
    //对图案随机加入线条造成干扰
    var lineNumber = 5; // 线条条数
    var lineX = 400;
    var lineY = 200; // 最大线条坐标
    for (i = 0; i < lineNumber; i++) {
      ctx.strokeStyle = colors[Math.floor(Math.random() * 5)];
      ctx.beginPath();
      ctx.moveTo(Math.floor(Math.random() * lineX), Math.floor(Math.random() * lineY));
      ctx.lineTo(Math.floor(Math.random() * lineX), Math.floor(Math.random() * lineY));
      ctx.stroke();
    }
    return {
      url: c.toDataURL("image/png"),
      alt: chars.join('')
    }
  },
  // 获取Token
  getToken() {
    if (window.sessionStorage && window.sessionStorage.wdUser) {
      return window.sessionStorage.wdUser;
    } else if (window.localStorage && window.localStorage.wdUser) {
      return window.localStorage.wdUser;
    } else if (window.document.cookie) {
      return getCookie("wdUser");
    }
  },

  // 设置Token
  setToken(token, rememberTime) {
    if (window.sessionStorage) {
      window.sessionStorage.wdUser = token;
    }

    if ((rememberTime && window.localStorage) || !window.sessionStorage) {
      window.localStorage.wdUser = token;
    }

    if (
      window.document.cookie && !window.sessionStorage && !window.localStorage
    ) {
      if (rememberTime) {
        setCookie("wdUser", token, rememberTime);
      } else {
        setCookie("wdUser", token);
      }
    }
  },

  // 删除Token
  delToken() {
    if (window.sessionStorage && window.sessionStorage.wdUser) {
      window.sessionStorage.removeItem("wdUser");
    }

    if (window.localStorage && window.localStorage.wdUser) {
      window.localStorage.removeItem("wdUser");
    }

    if (window.document.cookie) {
      delCookie("wdUser");
    }
  }
  // 处理token
}
