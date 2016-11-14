import 'designer/less/main.less'
import menus from 'designer/components/menus/menus.vue';
import editors from 'designer/components/editors/editors.vue';
import screen from 'designer/components/screen/screen.vue';
import operation from 'designer/components/operation/operation.vue';
import uploadImg from 'designer/plugin/uploadImg/uploadImg';
import toast from 'designer/components/toast/toast.vue';
import dialog from 'designer/components/dialog/dialog.vue';
import {mapActions} from 'vuex';
import store from 'store/index';
Vue.use(uploadImg, {
    url: '../backend/uploadImg.php', //上传地址
    fileDataName: 'upload', //上传的name
    maxFileSize: 5 * 1024 * 1024 //图片上限
});
const _actions = mapActions(['init']);
const main = new Vue({
    el: document.getElementById('main'),
    data: {},
    components: {
        menus, editors, screen, operation, toast, dialog
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