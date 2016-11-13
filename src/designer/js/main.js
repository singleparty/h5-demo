import 'designer/less/main.less'
import menus from 'designer/components/menus/menus.vue';
import editors from 'designer/components/editors/editors.vue';
import screen from 'designer/components/screen/screen.vue';
import operation from 'designer/components/operation/operation.vue';
import uploadImg from 'designer/components/uploadImg/uploadImg.vue';
import toast from 'designer/components/toast/toast.vue';
import dialog from 'designer/components/dialog/dialog.vue';
import {mapActions } from 'vuex';
import store from 'store/index';
const _actions = mapActions(['init']);
const main = new Vue({
    el: document.getElementById('main'),
    data: {
        uploadImgOption: {
            url: '../backend/uploadImg.php', //上传地址
            fileDataName: 'upload', //上传的name
            maxFileSize: 5 * 1024 * 1024 //图片上限
        }
    },
    components: {
        menus, editors, screen, operation, uploadImg, toast, dialog
    },
    ready: function () {
        this.init();
    },
    methods: {
        ..._actions
    },
    store
});
export default main;
/*
import u from 'designer/plugin/uploadImg/uploadImg.js';
Vue.use(u, {
    url: '../backend/uploadImg.php', //上传地址
    fileDataName: 'upload', //上传的name
    maxFileSize: 5 * 1024 * 1024 //图片上限
});*/
