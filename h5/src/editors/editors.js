define([
    'jquery',
    'editors/imgUploadEdt/imgUploadEdt',
    'editors/showcaseEdt/showcaseEdt'
], function ($) {
    var edtArr = Array.prototype.slice.call(arguments, 1);
    var edtObject = {};
    var curEdt = null; // 当前编辑器名称
    for (var i = 0, length = edtArr.length; i < length; i++) {
        edtObject[edtArr[i]['edtName']] = edtArr[i];
    }
    return {
        edtArr: edtArr,
        edtObject: edtObject
    };
});