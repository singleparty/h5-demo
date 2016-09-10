var Vue = require('vue');
var style = require('./style.less');
var tpl = require('./template.html');
var pic = require('./default.png');
module.exports = Vue.extend({
    template: tpl,
    props: {
        //相当于初始化
        info: {
            type: Object,
            coerce: function(val){
                if(val.imgSrc === undefined) {
                    Vue.set(val, 'imgSrc', '');
                }
                if(val.href === undefined) {
                    Vue.set(val, 'href', '');
                }
                if(val.text === undefined) {
                    Vue.set(val, 'text', 'text');
                }
                return val;
            },
            twoWay: false
        },
        index: {

        }
    },
    computed:{
        imgSrc: function() {
            return this.info.imgSrc ? this.info.imgSrc : pic;
        }
    },
    data: function () {
        return {};
    },
    methods: {
        editor: function ($event) {
            this.$dispatch('edit-com', {edtNames: ['brandEdt'], index: this.index});
        }
    }
});