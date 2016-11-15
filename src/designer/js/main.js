import vueResource from 'vueResource';
import 'designer/less/main.less'
import menus from 'designer/components/menus/menus.vue';
import editors from 'designer/components/editors/editors.vue';
import screen from 'designer/components/screen/screen.vue';
import operation from 'designer/components/operation/operation.vue';
import uploadImg from 'designer/plugin/uploadImg/uploadImg';
import toast from 'designer/plugin/toast/toast';
import dialog from 'designer/plugin/dialog/dialog';
import store from 'store/index';
Vue.use(vueResource);
Vue.http.options.emulateJSON = true;
Vue.use(uploadImg, {
    url: '../backend/uploadImg.php', //上传地址
    fileDataName: 'upload', //上传的name
    maxFileSize: 5 * 1024 * 1024 //图片上限
});
Vue.use(dialog);
Vue.use(toast);
const main = new Vue({
    el: document.getElementById('main'),
    data: {},
    components: {
        menus, editors, screen, operation
    },
    ready: function () {
        if(this.$store.dispatch('init')) {
            Vue.toast.open('读取缓存成功');
        }
    },
    store
});
export default main;