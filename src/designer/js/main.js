import 'designer/less/main.less';
import menus from 'designer/modules/menus/menus.vue';
import editors from 'designer/modules/editors/editors.vue';
import screen from 'designer/modules/screen/screen.vue';
import operation from 'designer/modules/operation/operation.vue';
import uploadImg from 'designer/modules/uploadImg/uploadImg.vue';
<<<<<<< HEAD
var main = new Vue({
    el: document.getElementById('main'),
    data: {
        coms: [], // for sketchpads
        edts: {}, // for modify
        scene: {}, // scene info
=======
import showMessage from 'designer/modules/showMessage/showMessage.vue';
import store from 'store/index';
import {init} from 'store/actions'
var main = new Vue({
    el: document.getElementById('main'),
    data: {
>>>>>>> dev
        uploadImgOption: {
            url: '../backend/uploadImg.php', //上传地址
            fileDataName: 'upload', //上传的name
            maxFileSize: 5 * 1024 * 1024 //图片上限
        }
    },
<<<<<<< HEAD
    methods: {
        addOnCom (name) {
            this.coms.push({
                comName: name,
                info: {}
            })
        },
        editCom (opt) {
            opt['info'] = this.coms[opt.index].info;
            this.edts = opt;
        },
        cancelEditCom (opt) {
            this.edts = {};
        },
        uploadImg (cb) {
            this.$refs.uploadImg.open(cb);
        },
        save (){
            console.log('保存');
        },
        publish (){
            console.log('发布');
=======
    components: {
        menus, editors, screen, operation, uploadImg, showMessage
    },
    ready: function () {
        this.init();
    },
    vuex: {
        actions: {
            init: init
>>>>>>> dev
        }
    },
    store
});
export default main;