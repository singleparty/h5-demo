<?php
    $base_path = '/h5/backend/upload/';
    $name = iconv('utf-8', 'gb2312', $_FILES['upload']['name']);
    $bool = move_uploaded_file($_FILES['upload']['tmp_name'], '../upload/' . $name);
    $name = iconv('gb2312', 'utf-8', $name);
    if ($bool) {
        $res = array('code' => 200, 'data' => array('imgUrl' => $base_path . $name));
    } else {
        $res = array('code' => 400, 'data' => null);
    }
    echo json_encode($res);
?>