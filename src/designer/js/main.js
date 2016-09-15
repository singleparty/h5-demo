require('../less/main.less');
var menus = require('designer/modules/menus/menus.vue');
var modify = require('designer/modules/modify/modify.vue');
var sketchpads = require('designer/modules/sketchpads/sketchpads.vue');
var operation = require('designer/modules/operation/operation.vue');
var comMap = require('components/coms-map');
var pluginUploadImg = require('plugins/uploadImg/uploadImg.js');
Vue.use(pluginUploadImg, {
    url: '../backend/uploadImg.php', //上传地址
    fileDataName: 'upload', //上传的name
    maxFileSize: 5 * 1024 * 1024 //图片上限
});
var main = new Vue({
    el: document.getElementById('main'),
    data: {
        comArr: comMap.comArr,
        coms: [],
        edts: {},
        scene: {}
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
        menus, modify, sketchpads, operation
    }
});
module.exports = main;