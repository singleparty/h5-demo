var Vue = require('vue');
var style = require('./style.less');
var tpl = require('./template.html');
var edtMap = require('editors/edts-map');
module.exports = Vue.extend({
    template: tpl,
    props: {
        edts: {
            type: Object,
            default: function () {
                return {};
            },
            twoWay: true
        },
        scene: {
            type: Object,
            coerce: function (val) {
                if(val.name === undefined) {
                    Vue.set(val, 'name', '');
                }
                return val;
            },
            twoWay: true
        }
    },
    data: function () {
        return {}
    },
    methods: {

    },
    components: edtMap.edtObj,
    ready: function(){

    }
});