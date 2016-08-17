if (__DEV__) require('../index.html');
require('../less/main.less');
var Vue = require('vue');
var moduleMenus = require('designer/modules/menus/constructor');
var moduleEditors = require('designer/modules/editors/constructor');
var moduleSketchpads = require('designer/modules/sketchpads/constructor');
var comMap = require('components/coms-map');
var main = new Vue({
    el: '#main',
    data: {
        comArr: comMap.comArr,
        coms: []
    },
    events: {
        addOnCom: function (opt) {
            this.coms.push(opt)
        }
    },
    computed: {

    },
    methods: {

    },
    components: {
        menus: moduleMenus,
        editors: moduleEditors,
        sketchpads: moduleSketchpads
    }
});
module.exports = main;