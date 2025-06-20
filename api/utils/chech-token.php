<?php
require("../../utils/token-handler.php");

function decodeTokenFromHeader(){
    $token =  substr($_SERVER['HTTP_AUTHORIZATION'] ?? '',7);//since it's a bearer token
    $userid = jwtDecode($token,"user_id");
    return $userid;
}