import UploadImg from './uploadImg.vue';
const myPlugin = {
    isInstall: false
};
myPlugin.install = function (Vue, opt) {
    if(myPlugin.isInstall) return;
    myPlugin.isInstall = true;
    Vue.uploadImg = new UploadImg({
        data: {option: opt}
    }).$mount().$appendTo(document.body);
};
export default myPlugin;