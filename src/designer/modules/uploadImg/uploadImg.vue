<template>
    <div class="upload-img animated" v-show="isShow" transition="bounce">
        <div class="mask" @click="close"></div>
        <div class="frame">
            <div class="frame-resources">
                <h5>资源列表</h5>

                <div class="resources">
                    <div class="item" v-for="resource in resources" track-by="$index">
                        <img :src="resource.imgUrl"/>

                        <div class="item-mask">
                            <button @click="select($index)">选中</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="frame-upload-queue">
                <h5>待上传资源</h5>

                <div class="queue">
                    <div class="item" v-for="item in queue" track-by="$index">
                        <div class="preview-backup"></div>
                        <img class="preview" :src="item.imgUrl" alt=""/>

                        <div class="percent" :style="{width: item.percent + '%'}"></div>
                    </div>
                </div>
            </div>
            <div class="frame-operate">
                <button class="browse">选择文件</button>
                <button class="start_upload" @click="start()">开始上传</button>
            </div>
            <div class="toast animated" v-if="isShowToast" transition="fade">
                <span class="tips" v-text="toast"></span>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import 'libs/animate.min.css';
    import _temp from 'plupload';
    import swf from 'libs/plupload/js/Moxie.swf';
    import xap from 'libs/plupload/js/Moxie.xap';
    import {uploadImgMethods} from 'store/actions';
    var plupload = _temp['window.plupload'];
    var mOxie = _temp['window.mOxie'];
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

    var mOxiePreviewImage = (file, callback) => {
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
    var previewImage = (file, cb) => {
        var native = file.getNative();
        if (native && createObjectURL) {
            cb && cb(createObjectURL(native));
        } else {
            mOxiePreviewImage(file, cb);
        }
    };
    var findObjFromArr = (arr, key, val) => {
        var object = null;
        arr.some(function (obj, i) {
            if (obj[key] === val) {
                object = obj;
                return true;
            }
        });
        return object;
    };
    var ctor = Vue.extend({
        data () {
            return {
                isShow: false,
                callback: null,
                uploader: null,
                resources: [],
                queue: [],
                //弹toast所需数据
                isShowToast: false,
                toast: '',
                showToastTimeoutHandler: null
            }
        },
        props: {
            option: {
                type: Object,
                required: true,
                validator: function (i) {
                    return i['url'] && i['maxFileSize'] && i['fileDataName'];
                }
            }
        },
        methods: {
            //open, close 供外部调用
            open (cb) {
                this.callback = cb;
                this.isShow = true;
            },
            close () {
                this.isShow = false;
            },
            select (index) {
                this.callback && this.callback(this.resources[index].imgUrl);
                this.close();
            },
            //开始上传
            start () {
                this.uploader.start();
            },
            showToast (msg) {
                var self = this;
                this.toast = msg;
                this.isShowToast = true;
                clearTimeout(this.showToastTimeoutHandler);
                this.showToastTimeoutHandler = setTimeout(function () {
                    self.isShowToast = false;
                }, 3000);
            }
        },
        compiled () {
            var self = this;
            this.uploader = new plupload.Uploader({
                browse_button: this.$el.querySelector('.browse'),
                runtimes: 'html5,html4,flash,silverlight,browserplus,gears',
                flash_swf_url: swf,
                silverlight_xap_url: xap,
                url: self.option.url,
                filters: {
                    mime_types: [{title: "Image files", extensions: "jpg,gif,jpeg,png"}],
                    max_file_size: self.option.maxFileSize,
                    prevent_duplicates: false
                },
                max_retries: 0,
                file_data_name: self.option.fileDataName,
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
                        } else {
                            self.showToast('上传失败请重试');
                        }
                        self.queue.$remove(findObjFromArr(self.queue, 'id', id));
                    },
                    Error: function (uploader, errObject) {
                        switch (errObject.code) {
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
        },
        ready () {
            this.uploader.init();
            this.uploadImgMethods({
                open: this.open, close: this.close
            });
        },
        transitions: {
            fade: {
                enterClass: 'fadeIn',
                leaveClass: 'fadeOut',
                type: 'animation'
            },
            bounce: {
                enterClass: 'bounceIn',
                leaveClass: 'bounceOut',
                type: 'animation'
            }
        },
        vuex: {
            actions: {
                uploadImgMethods
            }
        }
    })
    export default ctor;
</script>