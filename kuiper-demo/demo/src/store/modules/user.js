/*no-unused-vars*/
import { userApiControl } from '@/core'

const state = {
  jsSdkInfo: null,
  wxUserInfo: null,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_JSSDK_INFO: (state, payload) => {
    state.jsSdkInfo = payload
  },
  SET_WXUSER_INFO: (state, payload) => {
    state.wxUserInfo = payload
  }
}

const actions = {
  async setUserInfo({ commit, state }) {
    let data = await userApiControl.getJssdkInfo()
    commit('SET_JSSDK_INFO', data.data)
    commit('SET_WXUSER_INFO', await userApiControl.getUserInfo(state.jsSdkInfo))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
