import brand from 'components/brand/brand.vue';
import brandLogo from 'components/brand/brandLogo.png';
var comArr = [], comObj = {};
comArr.push({comName: 'brand', constructor: brand, logo: brandLogo});
comArr.forEach((e, i) => {
    comObj[e['comName']] = e['constructor'];
});
export {comArr, comObj};