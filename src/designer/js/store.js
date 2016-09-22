import Vuex from 'libs/vuex-1.0.0/vuex.js';
import Vue from 'libs/vue-1.0.26/vue.dev.js';
Vue.use(Vuex);
const state = {
    count: 1,
    a: {}
};
const mutations = {
    INCREMENT (state, amount) {
        state.count = state.count + amount;
    }
};
export default new Vuex.Store({
    strict: __DEV__,
    state, mutations
});
if(__DEV__) {
    if (module.hot) {
        module.hot.accept(['./actions'], () => {
            const newActions = require('./actions').default;
            store.hotUpdate({
                actions: newActions
            })
        })
    }
}