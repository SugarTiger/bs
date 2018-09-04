import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import util from './libs/util';
import { getToken } from "./libs/tool";
Vue.use(iView);
Vue.prototype.axios = util.ajax
Date.prototype.Format = util.Format
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted () {
        this.$store.commit('updateMenulist');
        if(getToken()){
            this.$store.commit('login',getToken());
        }
    }
});
