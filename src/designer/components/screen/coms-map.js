var comArr = [], comObj = {}, comToEdts = [];
import demo from './demo/demo.vue';
import demoLogo from './demo/demoLogo.png';
import banner from './banner/banner.vue';
import bannerLogo from './banner/bannerLogo.png';
import twoImage from './twoImage/twoImage.vue';
import twoImageLogo from './twoImage/twoImageLogo.png';
comArr.push({comName: 'demo', constructor: demo, logo: demoLogo, edts: ['demoEdt']});
comArr.push({comName: 'banner', constructor: banner, logo: bannerLogo, edts: ['bannerEdt']});
comArr.push({comName: 'twoImage', constructor: twoImage, logo: twoImageLogo, edts: ['twoImageEdt']});
comArr.forEach((e, i) => {
    comObj[e['comName']] = e['constructor'];
    comToEdts[e['comName']] = e['edts'];
});
export {comArr, comObj, comToEdts};