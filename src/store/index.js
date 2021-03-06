import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    audioSrc: '', // 音频src
    audioName: '',
    audioAuthor: '',
    musicAudioStatus: false,
    readAudioStatus: false,
    audioCurrentTime: ''
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})