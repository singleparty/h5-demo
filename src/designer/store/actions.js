export const addOnCom = ({dispatch, state}, name) => dispatch('ADD_ON_COM', name);
export const initComInfo = ({dispatch, state}, index, value) => dispatch('INIT_COM_INFO', index, value);
export const showComEdit = ({dispatch, state}, edts) => {
    var index = edts['index'];
    edts['info'] = state.coms[index]['info'];
    dispatch('SHOW_COM_EDIT', edts);
};
export const cancelComEdit = ({dispatch, state}) => dispatch('CANCEL_COM_EDIT');
export const editComInfo = ({dispatch, state}, index, expression, value) => {
    dispatch('EDIT_COM_INFO', index, expression, value);
};
export const deleteCom = ({dispatch, state}, index) => {
    dispatch('CANCEL_COM_EDIT');
    dispatch('DELETE_COM', index);
};
export const moveUpCom = ({dispatch, state}, index) => {
    dispatch('MOVE_UP_COM', index);
};
export const moveDownCom = ({dispatch, state}, index) => {
    dispatch('MOVE_DOWN_COM', index);
};
export const editSceneInfo = ({dispatch, state}, expression, value) => {
    dispatch('EDIT_SCENE_INFO', expression, value);
};
export const uploadImgMethods = ({dispatch, state}, value) => {
    dispatch('UPLOAD_IMG_METHODS', value);
};
export const init = ({dispatch, state}) => {
    if(localStorage.getItem('scene')) {
        var data = JSON.parse(decodeURIComponent(localStorage.getItem('scene')));
        dispatch('INIT', data);
    }
};