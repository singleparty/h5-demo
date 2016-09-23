import brand from 'components/brand/brand.vue';
var comArr = [], comObj = {};
comArr.push({comName: 'brand', 'zh-comName': '头图', constructor: brand});
comArr.forEach((e, i) => {
    comObj[e['comName']] = e['constructor'];
});
export {comArr, comObj};