import 'designer/less/main.less'
import menus from 'designer/modules/menus/menus.vue';
import modify from 'designer/modules/modify/modify.vue';
import sketchpads from 'designer/modules/sketchpads/sketchpads.vue';
import operation from 'designer/modules/operation/operation.vue';
import uploadImg from 'designer/modules/uploadImg/uploadImg.vue';
import store from 'designer/store/index';
var main = new Vue({
    el: document.getElementById('main'),
    data: {
        uploadImgOption: {
            url: '../backend/uploadImg.php', //上传地址
            fileDataName: 'upload', //上传的name
            maxFileSize: 5 * 1024 * 1024 //图片上限
        }
    },
    components: {
        menus, modify, sketchpads, operation, uploadImg
    },
    store
});
export default main;