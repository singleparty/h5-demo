var arr = [], obj = {}, _temp = null;
arr.push({
    comName: 'brand',
    'zh-comName': '头图',
    constructor: require('./brand/brand.vue')
});
for (var i = 0, l = arr.length; i < l; i++) {
    _temp = arr[i];
    obj[_temp['comName']] = _temp['constructor'];
}
module.exports = {
    comArr: arr, comObj: obj
};