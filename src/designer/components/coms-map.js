var comArr = [], comObj = {};
import brand from 'components/brand/brand.vue';
import brandLogo from 'components/brand/brandLogo.png';
import symmetry from 'components/symmetry/symmetry.vue';
import symmetryLogo from 'components/symmetry/symmetryLogo.png';
comArr.push({comName: 'brand', constructor: brand, logo: brandLogo});
comArr.push({comName: 'symmetry', constructor: symmetry, logo: symmetryLogo});
comArr.forEach((e, i) => {
    comObj[e['comName']] = e['constructor'];
});
export {comArr, comObj};