import demoEdt from 'editors/demoEdt/demoEdt.vue';
import bannerEdt from 'editors/bannerEdt/bannerEdt.vue';
import symmetryEdt from 'editors/symmetryEdt/symmetryEdt.vue';
var edtArr = [], edtObj = {};
edtArr.push({edtName: 'demoEdt', constructor: demoEdt});
edtArr.push({edtName: 'bannerEdt', constructor: bannerEdt});
edtArr.push({edtName: 'symmetryEdt', constructor: symmetryEdt});
edtArr.forEach((e, i) => {
    edtObj[e['edtName']] = e['constructor'];
});
export {edtArr, edtObj};