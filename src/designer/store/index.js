import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';
Vue.use(Vuex);
const state = {
    coms: [],
    activeComIndex: null,
    activeBranch: 1,
    pageId: -1,
    sceneInfo: {
        pageName: '',
        pageTitle: '',
        types: [
            {
                type: 1,
                coms: []
            }
        ]
    }
};
const store = new Vuex.Store({
    strict: __DEV__, state, mutations, actions, getters
});
export default store;
if (__DEV__) {
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