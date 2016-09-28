export const addOnCom = ({dispatch, state}, name) => dispatch('ADD_ON_COM', name);
export const editComInfo = ({dispatch, state}, index, value) => dispatch('EDIT_COM_INFO', index, value);
export const showComEdit = ({dispatch, state}, arr) => dispatch('SHOW_COM_EDIT', arr);
export const cancelComEdit = ({dispatch, state}) => dispatch('CANCEL_COM_EDIT');