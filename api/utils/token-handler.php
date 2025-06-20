<?php
require("../../modules/firebase/php-jwt/src/JWT.php");
require("../../modules/firebase/php-jwt/src/Key.php");
require("../../modules/firebase/php-jwt/src/SignatureInvalidException.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$privateKey = "mykey";


function jwtEncode($userid){
    global $privateKey;
    $payload = [
        'exp' => time() + 60*60*24*3 ,//3j
        "user_id" => $userid
    ];
    $token = JWT::encode($payload, $privateKey, 'HS256'); 
    return $token;
}


function jwtDecode($token,$key){
    global $privateKey;
    try {
        $decoded = JWT::decode($token, new Key($privateKey, 'HS256')); 
        $expTime = $decoded -> exp;
        $currentTime = time();
        if($expTime < $currentTime){
            return false;
        }else{
            return $decoded -> $key;
        }
    } catch (Exception $e) {
        return false;
    }
}

function encodeForConfirmation($email){
    global $privateKey;
    $payload = [
        'exp' => time() + 60*5 ,//5min
        "email" => $email
    ];
    $token = JWT::encode($payload, $privateKey, 'HS256'); 
    return $token;
}


