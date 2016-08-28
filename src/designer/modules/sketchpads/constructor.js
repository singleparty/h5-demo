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
        return {
            focus: null
        }
    },
    methods: {
        focusCom: function ($index) {
            this.focus = $index;
        },
        blurCom: function ($index) {
            this.focus = null;
            this.$dispatch('cancel-edit-com', {index: $index});
        },
        deleteCom: function ($index) {
            this.blurCom($index);
            this.coms.splice($index, 1);
        },
        moveUpCom: function ($index) {
            if ($index == 0) return false;
            var _temp = this.coms[$index];
            this.coms.$set($index, this.coms[$index - 1]);
            this.coms.$set($index - 1, _temp);
            this.focus--;
        },
        moveDownCom: function ($index) {
            if ($index == this.coms.length - 1) return false;
            var _temp = this.coms[$index];
            this.coms.$set($index, this.coms[$index + 1]);
            this.coms.$set($index + 1, _temp);
            this.focus++;
        }
    },
    components: comMap.comObj,
    ready: function () {

    }
});