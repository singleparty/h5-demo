require('../less/main.less');
var menus = require('designer/modules/menus/menus.vue');
var modify = require('designer/modules/modify/modify.vue');
var sketchpads = require('designer/modules/sketchpads/sketchpads.vue');
var operation = require('designer/modules/operation/operation.vue');
var uploadImg = require('designer/modules/uploadImg/uploadImg.vue');
var comMap = require('components/coms-map');
var main = new Vue({
    el: document.getElementById('main'),
    data: {
        comArr: comMap.comArr, // for menu
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
module.exports = main;