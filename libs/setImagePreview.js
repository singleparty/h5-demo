define(function () {
    function getObjectURL(file) {
        var _fn = null;
        if (window.createObjectURL != undefined) {
            _fn = window.createObjectURL;
        } else if (window.URL != undefined) {
            _fn = window.URL.createObjectURL;
        } else if (window.webkitURL != undefined) {
            _fn = window.webkitURL.createObjectURL;
        }
        getObjectURL = _fn;
        return _fn(file);
    }

    /*
     * setImagePreview(inputNode, divNode, imgNode)
     * param:
     *   inputNode:原生input对象
     *   divNode:原生div对象，用于旧版本浏览器预览
     *   imgNode:原生img对象，用于现代浏览器预览
     */
    return function setImagePreview(inputNode, divNode, imgNode) {
        imgNode.style.visibility = 'hidden';
        divNode.style.visibility = 'hidden';
        if (inputNode.files && inputNode.files[0]) {
            imgNode.src = getObjectURL(inputNode.files[0]);
            imgNode.style.visibility = 'visible';
        }
        else {
            inputNode.select();
            var imgSrc = document.selection.createRange().text;
            try {
                divNode.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                divNode.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
            }
            catch (e) {
                alert("您上传的图片格式不正确，请重新选择!");
                return false;
            }
            document.selection.empty();
            divNode.style.visibility = 'visible';
        }
    }
});