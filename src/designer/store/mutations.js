const editComInfoFuncs = {};
const editSceneInfoFuncs = {};
/*
 * 添加一个组件
 */
export const ADD_ON_COM = (state, {comName, edtNames}) => {
    state['coms'].push({
        comName: comName,
        edtNames: edtNames,
        info: null
    });
};
/*
 * 初始化一个组件的info信息
 */
export const INIT_COM_INFO = (state, {info}) => {
    var index = state.coms.length - 1;
    state.coms[index]['info'] = info;
};
/*
* 更新被选中的组件index
*/
export const UPDATE_ACTIVE_COM_INDEX = (state , index) => {
    state.activeComIndex = index;
};
/*
 * 编辑组件的info信息
 * 由于修改info需要在mutations，所以这么麻烦
 */
export const EDIT_COM_INFO = (state, {index, expression, value}) => {
    if (!editComInfoFuncs[expression]) {
        var path = '[\'' + expression.replace(/\./g, '\'][\'') + '\']';
        editComInfoFuncs[expression] = new Function('info', 'value', 'info' + path + '=value');
    }
    editComInfoFuncs[expression](state.coms[index]['info'], value);
};
/*
 * 删除组件
 */
export const REMOVE_COM = (state, index) => {
    state['coms'].splice(index, 1);
    state.activeComIndex = null;
};
/*
 * 组件上移
 */
export const MOVE_UP_COM = (state, index) => {
    if(index < 1) return;
    var _temp = state.coms.splice(index, 1)[0];
    state.coms.splice(index - 1, 0, _temp);
    state.activeComIndex--;
};
/*
 * 组件下移
 */
export const MOVE_DOWN_COM = (state, index) => {
    if(index === state.coms.length - 1) return;
    var _temp = state.coms.splice(index, 1)[0];
    state.coms.splice(index + 1, 0, _temp);
    state.activeComIndex++;
};
/*
 * 组件编辑
 */
export const EDIT_SCENE_INFO = (state, {expression, value}) => {
    if (!editSceneInfoFuncs[expression]) {
        var path = '[\'' + expression.replace(/\./g, '\'][\'') + '\']';
        editSceneInfoFuncs[expression] = new Function('sceneInfo', 'value', 'sceneInfo' + path + '=value');
    }
    editSceneInfoFuncs[expression](state.sceneInfo, value);
};
/*
 * 初始化
 */
export const INIT = (state, data) => {
    state.sceneInfo = data.sceneInfo;
    state.coms = data.sceneInfo.branch.type['0'];
};
/*
* 添加分支
* */
export const ADD_BRANCH = (state, {branchName}) => {
    var type = state.sceneInfo.branch.type;
    var newBranchKey = Math.max.apply(Math, Object.keys(type)) + 1;
    Vue.set(type, newBranchKey, Object.assign([], state.coms));
};
/*
* 转换分支
* */
export const CHANGE_BRANCH = (state, {branchName, branchKey}) => {
    state.coms = state.sceneInfo.branch[branchName][branchKey];
    state.activeComIndex = null;
};