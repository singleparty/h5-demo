var style = require('./style.less');
var tpl = require('./template.html');
var MyPlugin = {};
MyPlugin.install = function (Vue, options) {
    Vue.component('uploadImg', {
        template: tpl
    });
};
module.exports = MyPlugin;