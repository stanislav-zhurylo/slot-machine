import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import StateModel from '../model/StateModel'

Vue.use(Vuex);

const store = new Vuex.Store({
    actions,
    getters,
    mutations,
    state: new StateModel()
});

export default store;