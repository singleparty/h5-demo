export const ADD_ON_COM = (state, name) => {
    state['coms'].push({
        comName: name,
        info: {}
    });
};