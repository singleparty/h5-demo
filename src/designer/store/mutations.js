var editComInfoFuns = {};
/*
 * 添加一个组件
 */
export const ADD_ON_COM = (state, name) => {
    state['coms'].push({
        comName: name,
        info: {}
    });
};
/*
 * 初始化一个组件的info信息
 */
export const INIT_COM_INFO = (state, index, value) => {
    state['coms'][index]['info'] = value;
};
/*
 * 展示组件的编辑器
 */
export const SHOW_COM_EDIT = (state, arr) => {
    state.edts = arr
};
/*
 * 隐藏组件的编辑器
 */
export const CANCEL_COM_EDIT = (state) => {
    state.edts = []
};
/*
 * 编辑组件的info信息
 * 由于修改info需要在mutations，所以这么麻烦
 */
export const EDIT_COM_INFO = (state, index, expression, value) => {
    if (!editComInfoFuns[expression]) {
        var path = '[\'' + expression.replace(/\./g, '\'][\'') + '\']';
        editComInfoFuns[expression] = new Function('info', 'value', 'info' + path + '=value');
    }
    editComInfoFuns[expression](state.coms[index]['info'], value);
};