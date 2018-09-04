function getsec(time) { //转换时间，单位为小时3
    return time * 60 * 60 * 1000
}


// 写 cookies
export let setCookie = function setCookie(name, value, time) {
    if (time) {
        let strsec = getsec(time);
        let exp = new Date();
        exp.setTime(exp.getTime() + parseInt(strsec));
        document.cookie = name +
            "=" +
            escape(value) +
            ";expires=" +
            exp.toGMTString();
    } else {
        document.cookie = name + "=" + escape(value);
    }
};

// 读 cookies
export let getCookie = function (name) {
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    let arr = document.cookie.match(reg);
    return arr ? unescape(arr[2]) : null;
};

// 删 cookies
export let delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};

// 获取Token
export let getToken = function () {
    if (window.sessionStorage && window.sessionStorage.wdAdmin) {
        return window.sessionStorage.wdAdmin;
    } else if (window.localStorage && window.localStorage.wdAdmin) {
        return window.localStorage.wdAdmin;
    } else if (window.document.cookie) {
        return getCookie("wdAdmin");
    }
};

// 设置Token
export let setToken = function (token, rememberTime) {
    if (window.sessionStorage) {
        window.sessionStorage.wdAdmin = token;
    }

    if ((rememberTime && window.localStorage) || !window.sessionStorage) {
        window.localStorage.wdAdmin = token;
    }

    if (
        window.document.cookie && !window.sessionStorage && !window.localStorage
    ) {
        if (rememberTime) {
            setCookie("wdAdmin", token, rememberTime);
        } else {
            setCookie("wdAdmin", token);
        }
    }
};

// 删除Token
export let delToken = function () {
    if (window.sessionStorage && window.sessionStorage.wdAdmin) {
        window.sessionStorage.removeItem("wdAdmin");
    }

    if (window.localStorage && window.localStorage.wdAdmin) {
        window.localStorage.removeItem("wdAdmin");
    }

    if (window.document.cookie) {
        delCookie("wdAdmin");
    }
};

// 搜索函数
export let search = function (data, keyWord) {
    let res = data;
    let dataClone = data;
    keyWord = keyWord.toString();
    if (keyWord.length > 0) {
        res = dataClone.filter(d => {
            for (let key in d) {
                if(!d[key])return false;
                if (d[key].toString().indexOf(keyWord) > -1) {
                    return true;
                }
            }
        });
        dataClone = res;
    }
    return res;
}