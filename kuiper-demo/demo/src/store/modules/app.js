import cacheUtil from '@/utils/cache'

const state = {
  language: 'zh'
}

const mutations = {
  SET_LANGUAGE(state, language) {
    state.language = language
    cacheUtil.setLanguage(language)
  }
}

const actions = {
  SetLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
