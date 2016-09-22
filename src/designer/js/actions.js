export const increment = function ({ dispatch, state }) {
    setTimeout(()=>{
        dispatch('INCREMENT', 1);
    },1000);
};