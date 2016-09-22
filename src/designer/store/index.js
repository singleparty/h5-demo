var Vue = require('vue');
var Vuex = require('vuex');
var mutations = require('./mutations.js');
Vue.use(Vuex);
const state = {
    count: 1
};
var store = new Vuex.Store({
    strict: __DEV__,
    state, mutations
});
module.exports = store;
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