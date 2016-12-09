const editComInfoFuncs = {};
const editSceneInfoFuncs = {};
export const ADD_ON_COM = (state, {comName, edtNames}) => {
    state['coms'].push({
        comName: comName,
        edtNames: edtNames,
        info: null
    });
};
/*
 * 初始化一个组件的info信息,info格式任意，由不同的组件自己定义
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
 * 由于修改info需要在mutations操作，所以需要这么麻烦
 */
export const EDIT_COM_INFO = (state, {index, expression, value}) => {
    if (!editComInfoFuncs[expression]) {
        //a.b.c转换为['a']['b']['c']的形式
        var path = '[\'' + expression.replace(/\./g, '\'][\'') + '\']';
        //生成一个Function，方便多次调用
        editComInfoFuncs[expression] = new Function('info', 'value', 'info' + path + '=value');
    }
    editComInfoFuncs[expression](state.coms[index]['info'], value);
};
export const REMOVE_COM = (state, index) => {
    state['coms'].splice(index, 1);
    state.activeComIndex = null;
};
export const MOVE_UP_COM = (state, index) => {
    if(index < 1) return;
    var _temp = state.coms.splice(index, 1)[0];
    state.coms.splice(index - 1, 0, _temp);
    state.activeComIndex--;
};
export const MOVE_DOWN_COM = (state, index) => {
    if(index === state.coms.length - 1) return;
    var _temp = state.coms.splice(index, 1)[0];
    state.coms.splice(index + 1, 0, _temp);
    state.activeComIndex++;
};
/*
 * 编辑专题信息，原因同编辑组件信息一样，所以比较麻烦
 */
export const EDIT_SCENE_INFO = (state, {expression, value}) => {
    if (!editSceneInfoFuncs[expression]) {
        var path = '[\'' + expression.replace(/\./g, '\'][\'') + '\']';
        editSceneInfoFuncs[expression] = new Function('sceneInfo', 'value', 'sceneInfo' + path + '=value');
    }
    editSceneInfoFuncs[expression](state.sceneInfo, value);
};
/*
 * 从接口/本地获取保存的数据，进行初始化
 */
export const INIT = (state, data) => {
    if(data) {
        data.sceneInfo.types.sort(({type: a},{type: b}) => {
            return a - b;
        });
        state.sceneInfo = data.sceneInfo;
    }
    var type = state.sceneInfo.types[0];
    state.coms = type.coms;
    state.activeBranch = type.type;
};
/*
* 添加分支，现在只有“type”分支
*/
export const ADD_BRANCH = (state) => {
    var types = state.sceneInfo.types;
    var typeNum = types.reduce((a,b) => {
        return a.type > b.type ? a : b;
    }).type + 1;
    types.push({
        type: typeNum,
        coms: JSON.parse(JSON.stringify(state.coms))
    });
};
/*
* 转换分支
*/
export const CHANGE_BRANCH = (state, num) => {
    var type = state.sceneInfo.types.filter(({type}) => {
        return type === num;
    });
    state.coms = type[0].coms;
    state.activeBranch = type[0].type;
    state.activeComIndex = null;
};