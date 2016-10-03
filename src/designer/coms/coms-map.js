var comArr = [], comObj = {}, comToEdts = [];
import demo from 'coms/demo/demo.vue';
import demoLogo from 'coms/demo/demoLogo.png';
import banner from 'coms/banner/banner.vue';
import bannerLogo from 'coms/banner/bannerLogo.png';
import twoImage from 'coms/twoImage/twoImage.vue';
import twoImageLogo from 'coms/twoImage/twoImageLogo.png';
comArr.push({comName: 'demo', constructor: demo, logo: demoLogo, edts: ['demoEdt']});
comArr.push({comName: 'banner', constructor: banner, logo: bannerLogo, edts: ['bannerEdt']});
comArr.push({comName: 'twoImage', constructor: twoImage, logo: twoImageLogo, edts: ['twoImageEdt']});
comArr.forEach((e, i) => {
    comObj[e['comName']] = e['constructor'];
    comToEdts[e['comName']] = e['edts'];
});
export {comArr, comObj, comToEdts};