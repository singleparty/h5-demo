;
(function () {
    define([
        'require',
        'jquery',
        'common/js/utils',
        'depCss!./imgUploadEdt.css',
        'libs/setImagePreview',
        'jqueryForm'
    ], function (require, $, utils, css, setImagePreview, jqueryForm) {
        var edtName = 'imgUploadEdt';
        var defaultPic = require.toUrl('./default.png');

        function add() {
            return new Instance();
        }

        function Instance() {
            this.dom = createDom(this);
            this.callback = null;
        }

        Instance.prototype.render = function (_imgUrl, _callback) {
            this.dom.find('.preview-img').css('visibility', 'visible').attr('src', defaultPic);
            this.dom.find('.preview-div').css('visibility', 'hidden');
            this.dom.find('.icon').removeClass('success error');
            _imgUrl && this.dom.find('.preview-img').attr('src', _imgUrl).css('visibility', 'visible');
            this.callback = _callback;
        };

        function createDom(_instance) {
            var dom = $('<div class="imgUploadEdt">\
                <div class="frame">\
                    <div class="preview">\
                        <div class="preview-div"></div>\
                        <img class="preview-img" src="' + defaultPic + '"/>\
                    </div>\
                    <form method="post" enctype="multipart/form-data" class="upload-form">\
                        <input type="file" name="upload" class="upload"/>\
                    </form>\
                    <i class="icon"></i>\
                </div>\
            </div>');
            dom.instance = _instance;
            return event(dom);
        }

        function event(_dom) {
            var form = _dom.find('.upload-form');
            var upload = _dom.find('.upload');
            var previewDiv = _dom.find('.preview-div');
            var previewImg = _dom.find('.preview-img');
            var icon = _dom.find('.icon');
            upload.on('change', function (e) {
                icon.removeClass('success error');
                setImagePreview(upload[0], previewDiv[0], previewImg[0]);
                form.ajaxSubmit({
                    data: upload,
                    url: '/h5/backend/src/uploadImg.php',
                    dataType: 'json',
                    success: function (res) {
                        if (res && res.code == 200) {
                            _dom.instance.callback && _dom.instance.callback(res.data);
                            icon.addClass('success');
                        } else {
                            icon.addClass('error');
                        }
                    },
                    error: function () {
                        icon.addClass('error');
                    }
                });
            });
            return _dom;
        }

        return {
            edtName: edtName,
            description: '图片上传编辑器',
            add: add
        };
    });
}());