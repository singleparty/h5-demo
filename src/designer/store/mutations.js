var editComInfoFuncs = {};
var editSceneInfoFuncs = {};
/*
 * 添加一个组件
 */
export const ADD_ON_COM = (state, name) => {
    state['coms'].push({
        comName: name,
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
 * 展示组件的编辑器
 */
export const SHOW_COM_EDIT = (state, edts) => {
    state.edts = edts;
};
/*
 * 隐藏组件的编辑器
 */
export const CANCEL_COM_EDIT = (state) => {
    state.edts = {}
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
};
/*
 * 组件上移
 */
export const MOVE_UP_COM = (state, index) => {
    var _temp = state.coms[index];
    state.coms.$set(index, state.coms[index - 1]);
    state.coms.$set(index - 1, _temp);
    state.edts.index = index - 1;
};
/*
 * 组件下移
 */
export const MOVE_DOWN_COM = (state, index) => {
    var _temp = state.coms[index];
    state.coms.$set(index, state.coms[index + 1]);
    state.coms.$set(index + 1, _temp);
    state.edts.index = index + 1;
};
/*
 * 组件下移
 */
export const EDIT_SCENE_INFO = (state, {expression, value}) => {
    if (!editSceneInfoFuncs[expression]) {
        var path = '[\'' + expression.replace(/\./g, '\'][\'') + '\']';
        editSceneInfoFuncs[expression] = new Function('sceneInfo', 'value', 'sceneInfo' + path + '=value');
    }
    editSceneInfoFuncs[expression](state.sceneInfo, value);
};
/*
 * 上传图片方法集
 */
export const SET_UPLOAD_IMG_METHODS = (state, value) => {
    state.uploadImgMethods = value;
};
/*
 * 信息提示方法集
 */
export const SET_TOAST_METHODS = (state, value) => {
    state.toastMethods = value;
};
/*
* 确认操作方法集
*/
export const SET_DIALOG_METHODS = (state, value) => {
    state.dialogMethods = value;
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
};