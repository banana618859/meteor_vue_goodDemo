/*
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2019-12-22 18:53:45
 * @LastEditors  : yizheng.yuan
 * @LastEditTime : 2019-12-22 19:17:37
 */
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

var state = {
  msg: "state msg",
  userinfo: null
};

var mutations = {
  saveUserinfo(state, data) {
    state.userinfo = data;
  }
};
var actions = {};
var getters = {};

var store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
