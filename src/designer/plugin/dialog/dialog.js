import Dialog from './dialog.vue';
const myPlugin = {
    isInstall: false
};
myPlugin.install = function (Vue, opt) {
    if(myPlugin.isInstall) return;
    myPlugin.isInstall = true;
    let dialog = new Dialog().$mount().$appendTo(document.body);
    Vue.dialog = {
        open: dialog.open.bind(dialog),
        close: dialog.close.bind(dialog)
    };
};
export default myPlugin;