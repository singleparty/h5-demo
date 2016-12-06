export const editComInfo = ({commit, state}, payload) => {
    commit('EDIT_COM_INFO', payload, {silent: true});
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
                pageId: -1,
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
    }
    commit('INIT', data);
    return isSaved;
};
export const changeBranch = ({commit, dispatch, state}, payload) => {
    commit('CHANGE_BRANCH', payload);
};