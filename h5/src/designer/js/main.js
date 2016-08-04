;
(function () {
    define(['jquery', 'common/js/utils'], function ($, utils) {
        var comInfo = {}; //=>{_sdfjlaklasf:{id:'_sdfasdfsad',comName: 'showcase', basicCom: [Object Object], data: [Object Object]}}
        var edtInfo = {};
        //组件集合
        var comArr = null, comObject = null;
        //编辑器集合
        var edtArr = null, edtObject = null;
        //关键节点
        var canvas = $('.designer-wrap .canvas');
        var editors = $('.editors-wrap .editors');
        var components = $('.components-wrap .components');

        function renderComponent(comArr) {
            for (var i = 0, i = comArr.length; i < length; i++) {
                components.append('\
                    <div class="component" data-com-name="' + comArr[i]['comName'] + '">\
                        <img src="' + comArr[i]['logo'] + '" alt=""/>\
                    </div>\
                ');
            }
            for (var i in comObject) {
                components.append('\
                    <div class="component" data-com-name="' + i + '">\
                        <img src="' + comObject[i]['logo'] + '" alt=""/>\
                    </div>\
                ');
            }
        }

        function componentClick(event) {
            //ct short for currentTarget
            var ct = $(event.currentTarget);
            var comName = ct.data('comName');
            var id = utils.uniqueMarker();
            comInfo[id] = {comName: comName, id: id, data: {}};
            comInfo[id]['basicCom'] = utils.packageBasicCom(comObject[comName].add(comInfo[id]['data']), id, comName);
            canvas.append(comInfo[id]['basicCom']);
        }

        function basicComClick(event) {
            var ct = $(event.currentTarget);
            var comName = ct.data('comName');
            var id = ct.attr('id');
            var beCallEdts = [];
            if (ct.hasClass('focus')) return false;
            ct.siblings('.focus').each(function (i, e) {
                var ct = $(e);
                var comName = ct.data('comName');
                var id = ct.attr('id');
                ct.removeClass('focus');
                if (comObject[comName]['blur']) {
                    comObject[comName]['blur'](comInfo[id]['basicCom'], comInfo[id]['data']);
                }
            });
            ct.addClass('focus');
            if (comObject[comName]['focus']) {
                beCallEdts = beCallEdts.concat(comObject[comName]['focus'](comInfo[id]['basicCom'], comInfo[id]));
            }
            //调起编辑器
            callEditors(beCallEdts, comInfo[id]);
        }

        function callEditors(_arr, _info) {
            for (var i = 0, l = _arr.length; i < l; i++) {
                var edtName = _arr[i];
                if (!edtInfo[edtName]) {
                    var instance = edtObject[edtName].add();
                    var id = utils.uniqueMarker();
                    edtInfo[edtName] = {edtName: edtName, id: id, instance: instance};
                    edtInfo[edtName]['basicEdt'] = utils.packageBasicEdt(instance.dom, id, edtName);
                    editors.append(edtInfo[edtName]['basicEdt']);
                }
                edtInfo[edtName]['instance'].render(_info);
                edtInfo[edtName]['basicEdt'].show();
            }
        }

        function init(_com, _edt) {
            comArr = _com.comArr;
            comObject = _com.comObject;
            edtArr = _edt.edtArr;
            edtObject = _edt.edtObject;
            //渲染组件
            renderComponent(comArr);
            //绑定组件单击事件
            components.on('click', '.component', componentClick);
            //canvas上组件单击事件
            canvas.on('click', '.basic-com', basicComClick);
        }

        return init;
    });
}());