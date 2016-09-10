if (__DEV__) require('../index.html');
require('../less/main.less');
var Vue = require('vue');
var moduleMenus = require('designer/modules/menus/constructor');
var moduleModify = require('designer/modules/modify/constructor');
var moduleSketchpads = require('designer/modules/sketchpads/constructor');
var comMap = require('components/coms-map');
var pluginUploadImg = require('plugins/uploadImg/constructor.js');
Vue.use(pluginUploadImg, {
    url: '/backend/uploadImg.php', //上传地址
    fileDataName: 'upload', //上传的name
    maxFileSize: 5 * 1024 * 1024 //图片上限
});
var main = new Vue({
    el: '#main',
    data: {
        comArr: comMap.comArr,
        coms: [],
        edts: {},
        scene: {}
    },
    events: {

    },
    computed: {

    },
    methods: {
        addOnCom: function (name) {
            this.coms.push({
                comName: name,
                info: {}
            })
        },
        editCom: function (opt) {
            opt['info'] = this.coms[opt.index].info;
            this.edts = opt;
        },
        cancelEditCom: function (opt) {
            this.edts = {};
        },
        uploadImg: function (cb) {
            this.$refs.uploadImg.open(cb);
        }
    },
    components: {
        menus: moduleMenus,
        modify: moduleModify,
        sketchpads: moduleSketchpads
    }
});
module.exports = main;