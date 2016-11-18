export const getEdts = state => {
    let index = state.activeComIndex;
    if(index === null) {
        return {};
    } else {
        let {info, edtNames} = state.coms[index];
        return {info, edtNames, index};
    }
};