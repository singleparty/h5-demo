import brandEdt from 'editors/brandEdt/brandEdt.vue';
var edtArr = [], edtObj = {};
edtArr.push({edtName: 'brandEdt', 'zh-edtName': '头图编辑器', constructor: brandEdt});
edtArr.forEach((e, i) => {
    edtObj[e['edtName']] = e['constructor'];
});
export {edtArr, edtObj};