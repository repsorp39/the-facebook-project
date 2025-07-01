<?php
require("../../utils/token-handler.php");
require_once("../../config/cors.php");


function decodeTokenFromHeader(){
    $token = '';
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $token = substr($_SERVER['HTTP_AUTHORIZATION'], 7);
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $token = substr($headers['Authorization'], 7);
        }
    }
    $userid = jwtDecode($token,"user_id");
    return $userid;
}

