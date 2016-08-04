;
(function () {
    define([
        'require',
        'depImage!!rel./showcase.png',
        'depCss!./showcase.css',
        'jquery',
        'common/js/utils',
        'editors/editors'
    ], function (require, logo, css, $, utils, editors) {
        var comName = 'showcase';
        var defaultPic = require.toUrl('./default.png');
        var compile = utils.template.compile(tpl());
        //返回待插入节点
        function add(_data) {
            initial(_data);
            return $(compile(_data));
        }

        function render(_data) {
            return $(compile(_data));
        }

        function focus(_basicCom, _data) {
            return ['showcaseEdt'];
        }

        function blur(_basicCom, _data) {

        }

        function tpl() {
            return '<div class="showcase">\
                <div class="showcase-main">\
                    {{each imgArr as item}}\
                    <div class="showcase-item"">\
                        <a href="{{item.link || "###"}}"><img src="{{item.imgUrl || "' + defaultPic + '"}}" alt=""/></a>\
                    </div>\
                    {{/each}}\
                </div>\
            </div>';

        }

        function initial(_data) {
            _data['imgArr'] = [];
            for (var i = 0; i < 3; i++) {
                _data['imgArr'].push({
                    imgUrl: '', link: ''
                });
            }
        }

        return {
            comName: comName,
            logo: logo.src,
            description: '陈列3张矩形小图',
            add: add,
            render: render,
            focus: focus,
            blur: blur
        }
    });
}());