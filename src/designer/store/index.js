import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
Vue.use(Vuex);
const state = {
    coms: [],
    edts: [],
    sceneInfo: {
        name: ''
    }
};
var store = new Vuex.Store({
    state, mutations
});
export default store;
if(__DEV__) {
    if (module.hot) {
        module.hot.accept(['./actions', './mutations'], () => {
            const newActions = require('./actions').default;
            const newMutations = require('./mutations').default;
            store.hotUpdate({
                actions: newActions,
                mutations: newMutations
            })
        })
    }
}