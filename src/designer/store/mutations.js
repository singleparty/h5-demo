export const ADD_ON_COM = (state, name) => {
    state['coms'].push({
        comName: name,
        info: {}
    });
};
export const INIT_COM_INFO = (state, index, value) => {
    state['coms'][index]['info'] = value;
};
export const SHOW_COM_EDIT = (state, arr) => {
    state.edts = arr
};
export const CANCEL_COM_EDIT = (state) => {
    state.edts = []
};