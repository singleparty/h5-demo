var arr = [], obj = {}, _temp = null;
arr.push({
    edtName: 'brandEdt',
    'zh-edtName': '头图编辑器',
    constructor: require('./brandEdt/brandEdt.vue')
});
for (var i = 0, l = arr.length; i < l; i++) {
    _temp = arr[i];
    obj[_temp['edtName']] = _temp['constructor'];
}
module.exports = {
    edtArr: arr, edtObj: obj
};