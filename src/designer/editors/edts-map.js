import brandEdt from 'editors/brandEdt/brandEdt.vue';
import symmetryEdt from 'editors/symmetryEdt/symmetryEdt.vue';
var edtArr = [], edtObj = {};
edtArr.push({edtName: 'brandEdt', constructor: brandEdt});
edtArr.push({edtName: 'symmetryEdt', constructor: symmetryEdt});
edtArr.forEach((e, i) => {
    edtObj[e['edtName']] = e['constructor'];
});
export {edtArr, edtObj};