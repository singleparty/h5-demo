var style = require('./style.less');
var tpl = require('./template.html');
var _temp = require('plupload');
var plupload = _temp['window.plupload'];
var mOxie = _temp['window.mOxie'];
var swf = require('libs/plupload/js/Moxie.swf');
var xap = require('libs/plupload/js/Moxie.xap');
var MyPlugin = {};
var createObjectURL = (function () {
    var fn = null;
    if (window.createObjectURL != undefined) {
        fn = window.createObjectURL;
    } else if (window.URL != undefined) {
        fn = window.URL.createObjectURL;
    } else if (window.webkitURL != undefined) {
        fn = window.webkitURL.createObjectURL;
    }
    return fn;
}());

var mOxiePreviewImage = function (file, callback) {
    //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
    //确保文件是图片
    if (!file || !/image\//.test(file.type)) return;
    //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
    if (file.type == 'image / gif') {
        var fr = new mOxie.FileReader();
        fr.onload = function () {
            callback(fr.result);
            fr.destroy();
            fr = null;
        };
        fr.readAsDataURL(file.getSource());
    }
    else {
        var preloader = new mOxie.Image();
        preloader.onload = function () {
            //得到图片src,实质为一个base64编码的数据
            var imgsrc = preloader.type == 'image / jpeg' ? preloader.getAsDataURL(image / jpeg, 80) :
                preloader.getAsDataURL();
            callback && callback(imgsrc);
            preloader.destroy();
            preloader = null;
        };
        preloader.load(file.getSource());
    }
};
var previewImage = function (file, cb) {
    var native = file.getNative();
    if (native && createObjectURL) {
        cb && cb(createObjectURL(native));
    } else {
        mOxiePreviewImage.apply(this, Array.prototype.slice.call(arguments, 0));
    }
};
var findObjFromArr = function (arr, key, val) {
    var object = null;
    arr.some(function (obj, i) {
        if (obj[key] === val) {
            object = obj;
            return true;
        }
    });
    return object;
};
MyPlugin.install = function (Vue, options) {
    Vue.component('uploadImg', {
        template: tpl,
        data: function () {
            return {
                uploader: null,
                resources: [],
                queue: [],
                //弹toast所需数据
                isShowToast: false,
                toast: '',
                showToastTimeoutHandler: null
            }
        },
        methods: {
            start: function () {
                this.uploader.start();
            },
            showToast: function (msg) {
                var self = this;
                this.toast = msg;
                this.isShowToast = true;
                clearTimeout(this.showToastTimeoutHandler);
                this.showToastTimeoutHandler = setTimeout(function () {
                    self.isShowToast = false;
                }, 3000);
            }
        },
        compiled: function () {
            var self = this;
            this.uploader = new plupload.Uploader({
                browse_button: this.$el.querySelector('.browse'),
                flash_swf_url: swf,
                silverlight_xap_url: xap,
                url: '/backend/uploadImg.php',
                filters: {
                    mime_types: [{title: "Image files", extensions: "jpg,gif,jpeg,png"}],
                    max_file_size: 5 * 1024 * 1024,
                    prevent_duplicates: false
                },
                max_retries: 0,
                file_data_name: 'upload',
                init: {
                    FilesRemoved: function (uploader, files) {

                    },
                    FilesAdded: function (uploader, files) {
                        files.forEach(function (file, index) {
                            previewImage(file, function (url) {
                                self.queue.push({
                                    id: file.id,
                                    imgUrl: url,
                                    percent: 0
                                });
                            });
                        });
                    },
                    UploadProgress: function (uploader, file) {
                        var id = file.id;
                        var percent = file.percent;
                        var obj = findObjFromArr(self.queue, 'id', id);
                        obj && (obj.percent = percent);
                    },
                    FileUploaded: function (uploader, file, responseObject) {
                        var res = responseObject.response;
                        var id = file.id;
                        res = (typeof res).toLowerCase() == 'string' ? JSON.parse(res) : res;
                        if (res.code == 200) {
                            var url = res.data.imgUrl;
                            self.resources.push({
                                imgUrl: url
                            });
                            self.queue.$remove(findObjFromArr(self.queue, 'id', id));
                        }
                    },
                    Error: function (uploader, errObject) {
                        switch(errObject.code) {
                            case plupload.HTTP_ERROR:
                                self.showToast('网络错误，请刷新重试');
                                break;
                            case plupload.FILE_SIZE_ERROR:
                                self.showToast('文件大于5m，请重新选择');
                                break;
                            case plupload.FILE_EXTENSION_ERROR:
                                self.showToast('选择的文件类型有误，只能上传图片');
                                break;
                            case plupload.FILE_DUPLICATE_ERROR:
                                self.showToast('不允许上传重复图片');
                                break;
                            case plupload.IMAGE_FORMAT_ERROR:
                                self.showToast('图片格式有误');
                                break;
                            default :
                                self.showToast('操作出错，请刷新重试');
                        }
                    }
                }
            });
            this.uploader.init();
        }
    });
};
module.exports = MyPlugin;