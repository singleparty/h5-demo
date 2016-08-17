var Vue = require('vue');
var style = require('./style.less');
var tpl = require('./template.html');
var comMap = require('components/coms-map');
module.exports = Vue.extend({
    template: tpl,
    props: {
        coms: {
            type: Array,
            default: function () {
                return [];
            },
            twoWay: false
        }
    },
    data: function () {
        return {}
    },
    components: comMap.comObj,
    ready: function(){

    }
});