import Vuex from 'libs/vuex-1.0.0/vuex.js';
import Vue from 'libs/vue-1.0.26/vue.dev.js';
Vue.use(Vuex);
const state = {
    count: 0,
    a: {}
};
const mutations = {
    INCREMENT (state, amount) {
        state.count = state.count + amount;
    }
};
export default new Vuex.Store({
    state, mutations
});