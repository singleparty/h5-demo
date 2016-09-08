if (__DEV__) require('../index.html');
require('../less/main.less');
var Vue = require('vue');
var moduleMenus = require('designer/modules/menus/constructor');
var moduleModify = require('designer/modules/modify/constructor');
var moduleSketchpads = require('designer/modules/sketchpads/constructor');
var comMap = require('components/coms-map');
var pluginUploadImg = require('plugins/uploadImg/constructor.js');
Vue.use(pluginUploadImg);
var main = new Vue({
    el: '#main',
    data: {
        comArr: comMap.comArr,
        coms: [],
        edt: {},
        scene: {},
        isShowUploadImg: false
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
            opt.info = this.coms[opt.index].info;
            this.edt = opt;
        },
        cancelEditCom: function (opt) {
            this.edt = {};
        }
    },
    components: {
        menus: moduleMenus,
        modify: moduleModify,
        sketchpads: moduleSketchpads
    }
});
module.exports = main;