import Vue from 'vue'
import Vuex from 'vuex'
import Http from '../utils/http';

Vue.use(Vuex)

const state = {
  shopInfo:{},
  cartCount:0
}
const mutations = {
  setShopInfo(state,shopInfo){
    state.shopInfo = shopInfo;
  },
  setCartCount(state,cartCount){
    state.cartCount = cartCount;
  },
  getCartCount(state){
    Http.get("/getCart", null, res => {
      state.cartCount = res.data.qty;
    });
  }
}
export default new Vuex.Store({
  state,
  mutations
})
