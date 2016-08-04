;
(function () {
    define([
        'jquery',
        'common/js/utils',
        'depCss!./showcaseEdt.css',
        'editors/imgUploadEdt/imgUploadEdt'
    ], function ($, utils, css, imgUploadEdt) {
        var edtName = 'showcaseEdt';
        var imgUploadEdtInstances = [];

        function add() {
            return new Instance();
        }

        function Instance() {
            this.dom = createDom();
        }

        Instance.prototype.render = function (_info) {
            var self = this;
            var basicCom = _info['basicCom'];
            var id = _info['id'];
            var imgArr = _info['data']['imgArr'];
            for (var i = 0, l = imgArr.length; i < l; i++) {
                imgUploadEdtInstances[i].render(imgArr[i]['imgUrl'], (function (index) {
                    return function (res) {
                        basicCom.find('.showcase-item img').eq(index).attr('src', res.imgUrl);
                        imgArr[index]['imgUrl'] = res.imgUrl;
                    };
                }(i)));
            }
        };

        function createDom() {
            var dom = $('<div class="showcaseEdt"></div>');
            for (var i = 0; i < 3; i++) {
                var imgInst = imgUploadEdt.add();
                dom.append(imgInst.dom);
                imgUploadEdtInstances.push(imgInst);
            }
            return dom;
        }

        return {
            edtName: edtName,
            description: 'showcase专用编辑器',
            add: add
        };
    });
}());