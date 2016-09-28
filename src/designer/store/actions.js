export const addOnCom = ({dispatch, state}, name) => dispatch('ADD_ON_COM', name);
export const initComInfo = ({dispatch, state}, index, value) => dispatch('INIT_COM_INFO', index, value);
export const showComEdit = ({dispatch, state}, arr) => dispatch('SHOW_COM_EDIT', arr);
export const cancelComEdit = ({dispatch, state}) => dispatch('CANCEL_COM_EDIT');
export const editComInfo = ({dispatch, state}, info, expression, value) => {
    dispatch('EDIT_COM_INFO', info, expression, value);
};