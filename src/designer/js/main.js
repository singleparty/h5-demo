import 'designer/less/main.less'
import menus from 'designer/modules/menus/menus.vue';
import modify from 'designer/modules/modify/modify.vue';
import sketchpads from 'designer/modules/sketchpads/sketchpads.vue';
import operation from 'designer/modules/operation/operation.vue';
import uploadImg from 'designer/modules/uploadImg/uploadImg.vue';
import {comArr} from 'components/coms-map';
var main = new Vue({
    el: document.getElementById('main'),
    data: {
        comArr: comArr, // for menu
        coms: [], // for sketchpads
        edts: {}, // for modify
        scene: {}, // scene info
        uploadImgOption: {
            url: '../backend/uploadImg.php', //上传地址
            fileDataName: 'upload', //上传的name
            maxFileSize: 5 * 1024 * 1024 //图片上限
        }
    },
    events: {},
    computed: {},
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
        }
    },
    components: {
        menus, modify, sketchpads, operation, uploadImg
    }
});
export default main;