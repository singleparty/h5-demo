var Vue = require('vue');
var style = require('./style.less');
var tpl = require('./template.html');
var pic = require('./default.png');
module.exports = Vue.extend({
    template: tpl,
    data: function() {
        return {
            imgSrc: pic, href: ''
        }
    },
    methods: {
        editor: function($event){

        }
    }
});