if (__DEV__) require('../index.html');
require('../less/main.less');
var Vue = require('vue');
var moduleMenus = require('designer/modules/menus/constructor');
var moduleModify = require('designer/modules/modify/constructor');
var moduleSketchpads = require('designer/modules/sketchpads/constructor');
var comMap = require('components/coms-map');
var main = new Vue({
    el: '#main',
    data: {
        comArr: comMap.comArr,
        coms: [],
        edt: {},
        scene: {}
    },
    events: {
        'add-on-com': function (name) {
            this.coms.push({
                comName: name,
                info: {}
            })
        },
        'edit-com': function(opt) {
            opt.info = this.coms[opt.index].info;
            this.edt = opt;
        },
        'cancel-edit-com': function(opt){
            this.edt = {};
        }
    },
    computed: {

    },
    methods: {

    },
    components: {
        menus: moduleMenus,
        modify: moduleModify,
        sketchpads: moduleSketchpads
    }
});
module.exports = main;