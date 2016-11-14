import Toast from './toast.vue';
const myPlugin = {
    isInstall: false
};
myPlugin.install = function (Vue, opt) {
    if(myPlugin.isInstall) return;
    myPlugin.isInstall = true;
    let toast = new Toast().$mount().$appendTo(document.body);
    Vue.toast = {
        open: toast.open.bind(toast),
        close: toast.close.bind(toast)
    };
};
export default myPlugin;