export const addOnCom = ({commit, state}, name) => commit('ADD_ON_COM', name);
export const initComInfo = ({commit, state}, index, value) => commit('INIT_COM_INFO', index, value);
export const showComEdit = ({commit, state}, edts) => {
    var index = edts['index'];
    edts['info'] = state.coms[index]['info'];
    commit('SHOW_COM_EDIT', edts);
};
export const cancelComEdit = ({commit, state}) => commit('CANCEL_COM_EDIT');
export const editComInfo = ({commit, state}, index, expression, value) => {
    commit('EDIT_COM_INFO', index, expression, value);
};
export const removeCom = ({commit, state}, index) => {
    commit('CANCEL_COM_EDIT');
    commit('REMOVE_COM', index);
};
export const moveUpCom = ({commit, state}, index) => {
    commit('MOVE_UP_COM', index);
};
export const moveDownCom = ({commit, state}, index) => {
    commit('MOVE_DOWN_COM', index);
};
export const editSceneInfo = ({commit, state}, expression, value) => {
    commit('EDIT_SCENE_INFO', expression, value);
};
export const setUploadImgMethods = ({commit, state}, value) => {
    commit('SET_UPLOAD_IMG_METHODS', value);
};
export const setShowMessageMethods = ({commit, state}, value) => {
    commit('SET_SHOW_MESSAGE_METHODS', value);
};
export const init = ({commit, state}) => {
    if(localStorage.getItem('scene')) {
        var data = JSON.parse(decodeURIComponent(localStorage.getItem('scene')));
        commit('INIT', data);
        state.showMessageMethods.open('读取缓存成功');
    }
};