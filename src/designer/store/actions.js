export const addOnCom = ({commit, state}, name) => {
    commit('ADD_ON_COM', name);
};
export const initComInfo = ({commit, state}, payload) => {
    commit('INIT_COM_INFO', payload, {silent: true});
};
export const showComEdit = ({commit, state}, edts) => {
    var index = edts['index'];
    edts['info'] = state.coms[index]['info'];
    commit('SHOW_COM_EDIT', edts, {silent: true});
};
export const cancelComEdit = ({commit, state}, payload) => {
    commit('CANCEL_COM_EDIT', {}, {silent: true});
};
export const editComInfo = ({commit, state}, payload) => {
    commit('EDIT_COM_INFO', payload, {silent: true});
};
export const removeCom = ({commit, state}, index) => {
    commit('CANCEL_COM_EDIT', {}, {silent: true});
    commit('REMOVE_COM', index);
};
export const moveUpCom = ({commit, state}, index) => {
    commit('MOVE_UP_COM', index, {silent: true});
};
export const moveDownCom = ({commit, state}, index) => {
    commit('MOVE_DOWN_COM', index, {silent: true});
};
export const editSceneInfo = ({commit, state}, payload) => {
    commit('EDIT_SCENE_INFO', payload, {silent: true});
};
export const init = ({commit, state}, payload) => {
    var data, isSaved = localStorage.getItem('scene');
    if (isSaved) {
        data = JSON.parse(decodeURIComponent(localStorage.getItem('scene')));
    } else {
        data = {
            sceneInfo: {
                name: '',
                branch: {
                    type: {'0': []}
                }
            }
        };
    }
    commit('INIT', data);
    if(isSaved) state.toastMethods.open('读取缓存成功');
};
export const changeBranch = ({commit, dispatch, state}, payload) => {
    commit('CANCEL_COM_EDIT', {}, {silent: true});
    commit('CHANGE_BRANCH', payload);
};