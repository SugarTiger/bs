import Cookies from 'js-cookie';
import {
    setCookie,
    getCookie,
    delCookie,
    getToken,
    setToken,
    delToken
} from "../../libs/tool";

const user = {
    state: {
        token: ''
    },
    mutations: {
        logout(state) {
            state.token = '';
            delToken()//删除Token
            Cookies.remove('user');
            Cookies.remove('adminId');
            Cookies.remove('access');
        },
        login(state, token) {
            state.token = token;//设置Token
            setToken(token,3);//设置Token
        }
    }
};

export default user;