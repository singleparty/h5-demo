var Vue = require('vue');
var style = require('./style.less');
var tpl = require('./template.html');
module.exports = Vue.extend({
    template: tpl,
    props: {
        info: {
            type: Object,
            twoWay: true
        }
    },
    computed: {
        showImg: function () {
            return !!this.info.imgSrc
        }
    },
    data: function () {
        return {};
    },
    watch: {

    },
    filters: {
        protocol: {
            read: function (val) {
                var pre = '', _temp;
                _temp = val.replace(/https?:\/\//, function (match) {
                    pre = match;
                    return '';
                });
                return pre ? pre + _temp : 'http://' + _temp;
            },
            write: function (val) {
                var pre = '', _temp;
                _temp = val.replace(/https?:\/\//, function (match) {
                    pre = match;
                    return '';
                });
                return _temp ? (pre ? pre + _temp : 'http://' + _temp) : '';
            }
        }
    },
    methods: {
        upload: function () {
            var self = this;
            this.$dispatch('upload-img', function (url) {
                self.info.imgSrc = url;
            });
        }
    }
});