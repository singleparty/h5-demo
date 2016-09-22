<?php
    header('Access-Control-Allow-Origin:*');
    /*创建目录*/
    $path = iconv('UTF-8', 'gb2312', '../upload/' . date('Y') . '/' . date('m') . '/' . date('d'));
    if (!is_dir($path)) {
        $bool = mkdir($path, 0777, true);
        !$bool && die(json_encode(array('code' => 400, 'data' => null)));
    }
    /*返回随机字符串*/
    function random_char($length) {
        $str = null;
        $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        $max = strlen($strPol) - 1;
        for ($i = 0; $i < $length; $i++) {
            $str .= $strPol[rand(0, $max)];
        }
        return $str;
    }

    $origin_name = $_FILES['upload']['name'];
    $ext = substr($origin_name, strrpos($origin_name, '.') + 1);
    $new_name = random_char(20) . '.' . $ext;
    $bool = move_uploaded_file($_FILES['upload']['tmp_name'], $path . '/' . $new_name);
    if ($bool) {
        $pre = substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'], '/backend/uploadImg.php'));
        $res = array('code' => 200, 'data' => array('imgUrl' => $pre.substr($path . '/' . $new_name, 2)));
    } else {
        $res = array('code' => 400, 'data' => null);
    }
    echo json_encode($res);
?>