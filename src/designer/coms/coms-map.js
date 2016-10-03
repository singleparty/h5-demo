var comArr = [], comObj = {}, comToEdts = [];
import demo from 'coms/demo/demo.vue';
import demoLogo from 'coms/demo/demoLogo.png';
import banner from 'coms/banner/banner.vue';
import bannerLogo from 'coms/banner/bannerLogo.png';
import symmetry from 'coms/symmetry/symmetry.vue';
import symmetryLogo from 'coms/symmetry/symmetryLogo.png';
comArr.push({comName: 'demo', constructor: demo, logo: demoLogo, edts: ['demoEdt']});
comArr.push({comName: 'banner', constructor: banner, logo: bannerLogo, edts: ['bannerEdt']});
comArr.push({comName: 'symmetry', constructor: symmetry, logo: symmetryLogo, edts: ['symmetryEdt']});
comArr.forEach((e, i) => {
    comObj[e['comName']] = e['constructor'];
    comToEdts[e['comName']] = e['edts'];
});
export {comArr, comObj, comToEdts};