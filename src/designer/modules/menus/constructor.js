var Vue = require('vue');
var style = require('./style.less');
var tpl = require('./template.html');
var comMap = require('components/coms-map');
module.exports = Vue.extend({
    data: function () {
        return {
            menus: comMap.comArr
        }
    },
    methods: {
        add: function ($index) {
            this.$dispatch('add-on-com', this.menus[$index]['comName']);
        }
    },
    template: tpl
});