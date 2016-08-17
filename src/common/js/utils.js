var $ = require('jquery');
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

module.exports = {
    packageBasicCom: packageBasicCom,
    packageBasicEdt: packageBasicEdt,
    uniqueMarker: uniqueMarker
};