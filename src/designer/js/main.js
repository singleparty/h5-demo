import 'designer/less/main.less'
import menus from 'designer/modules/menus/menus.vue';
import editors from 'designer/modules/editors/editors.vue';
import screen from 'designer/modules/screen/screen.vue';
import operation from 'designer/modules/operation/operation.vue';
import uploadImg from 'designer/modules/uploadImg/uploadImg.vue';
import store from 'store/index';
import {init} from 'store/actions'
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
        menus, editors, screen, operation, uploadImg
    },
    ready: function () {
        this.init();
    },
    vuex: {
        actions: {
            init: init
        }
    },
    store
});
export default main;