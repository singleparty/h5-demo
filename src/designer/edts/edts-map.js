import demoEdt from 'edts/demoEdt/demoEdt.vue';
import bannerEdt from 'edts/bannerEdt/bannerEdt.vue';
import symmetryEdt from 'edts/symmetryEdt/symmetryEdt.vue';
var edtArr = [], edtObj = {};
edtArr.push({edtName: 'demoEdt', constructor: demoEdt});
edtArr.push({edtName: 'bannerEdt', constructor: bannerEdt});
edtArr.push({edtName: 'symmetryEdt', constructor: symmetryEdt});
edtArr.forEach((e, i) => {
    edtObj[e['edtName']] = e['constructor'];
});
export {edtArr, edtObj};