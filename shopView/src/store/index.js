import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  shopInfo:{}
}
const mutations = {
  setShopInfo(state,shopInfo){
    state.shopInfo = shopInfo;
  }
}
export default new Vuex.Store({
  state,
  mutations
})
