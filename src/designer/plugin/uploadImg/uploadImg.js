import UploadImg from './uploadImg.vue';
const myPlugin = {
    isInstall: false
};
myPlugin.install = function (Vue, opt) {
    if(myPlugin.isInstall) return;
    myPlugin.isInstall = true;
    let uploadImg = new UploadImg({
        data: {option: opt}
    }).$mount().$appendTo(document.body);
    Vue.uploadImg = {
        open: uploadImg.open.bind(uploadImg),
        close: uploadImg.close.bind(uploadImg)
    };
};
export default myPlugin;