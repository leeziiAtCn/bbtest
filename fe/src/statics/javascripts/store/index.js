/*
 * @Author: leezii 
 * @Date: 2017-06-27 13:34:09 
 * @Last Modified by: leezii
 * @Last Modified time: 2017-06-28 13:04:12
 */
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
  result: {}
}
const mutations = {
  result(state, newState) {
    state.result = newState
  }
}
const actions = {

}
const getters = {
  getRes(state) {
    return state.result
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})