<?php
require("../../utils/token-handler.php");
require_once("../../config/cors.php");


function decodeTokenFromHeader(){
    $token =  substr($_SERVER['HTTP_AUTHORIZATION'] ?? '',7);//since it's a bearer token
    $userid = jwtDecode($token,"user_id");
    return $userid;
}