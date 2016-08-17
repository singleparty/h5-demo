;
(function () {
    define([
        'jquery',
        'libs/artTemplate-v3.0.0/dist/template'
    ], function ($, template) {
        /*
         * 返回一个basic-com节点
         * params:
         * comName: 组件名字
         * id: 唯一标记符
         * domStr: 组件add方法返回的节点字符串
         */
        function packageBasicCom(dom, id, comName) {
            var basic = $('<div class="basic-com"></div>');
            basic.attr('id', id);
            basic.attr('data-com-name', comName);
            basic.addClass(comName + '-com');
            basic.append(dom);
            return basic;
        }

        /*
         * 返回一个basic-edt节点
         * params:
         * edtName: 编辑器名字
         * id: 唯一标记符
         * dom: 原生或者jquery节点类型
         */
        function packageBasicEdt(dom, id, edtName) {
            var basic = $('<div class="basic-edt"></div>');
            basic.attr('id', id);
            basic.attr('data-edt-name', edtName);
            basic.addClass(edtName + '-edt');
            basic.append(dom);
            return basic;
        }

        /*
         * 返回一个唯一标记符
         */
        function uniqueMarker() {
            var sample = 'abcdefghijklmnopqrstuvwxyz';
            var unique = '_';
            for (var i = 0; i < 15; i++) {
                unique += sample.charAt(parseInt(Math.random() * 14));
            }
            while (!isIdUnique(unique, document.body)) {
                unique = arguments.callee();
            }
            return unique
        }

        /*
         * 在给定的dom里面，id是否唯一，返回布尔值
         * params:
         * id: 符合规范的id名
         * dom：jquery或者原生节点
         */
        function isIdUnique(id, dom) {
            dom = dom instanceof jQuery ? dom : $(dom);
            if (!id) return false;
            return dom.attr('id') !== id && dom.find('#' + id).size() === 0;
        }

        /*
         * 节点之间是否父子关系或者是同一个元素，返回布尔值
         * params:
         * parent: 父节点
         * son: 子节点
         */
        function isImmediateRelation(parent, son) {
            parent = parent instanceof jQuery ? parent : $(parent);
            son = son instanceof jQuery ? son : $(son);
            return parent[0] == son[0] || parent.has(son).size() > 0;
        }

        /*
         * 从给定的arr中找到包含属性为attr，并且值为val的第一个对象
         */
        function findObjFromArr(arr, attr, val) {
            var obj = null;
            $.each(arr, function (i, e) {
                if (e[attr] === val) {
                    obj = e;
                    return false;
                }
            });
            return obj;
        }

        return {
            editorsNode: $('.editors-wrap .editors'),
            packageBasicCom: packageBasicCom,
            packageBasicEdt: packageBasicEdt,
            uniqueMarker: uniqueMarker,
            isImmediateRelation: isImmediateRelation,
            template: template,
            findObjFromArr: findObjFromArr
        };
    })
}());