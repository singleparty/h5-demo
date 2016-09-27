export const ADD_ON_COM = (state, name) => {
    state['coms'].push({
        comName: name,
        info: {}
    });
};
export const EDIT_COM_INFO = (state, index, value) => {
    state['coms'][index]['info'] = value;
};
export const SHOW_COM_EDIT = (state, arr) => {
    state.edts = arr
};