/*
* 根据当前选中的组件，返回编辑器需要的数据
*/
export const getEdts = state => {
    let index = state.activeComIndex;
    if(index === null) {
        return {};
    } else {
        let {info, edtNames} = state.coms[index];
        return {info, edtNames, index};
    }
};