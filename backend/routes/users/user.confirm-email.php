<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require_once("../../utils/token-handler.php");

use App\JSON\JSON;
use App\UserService\User;


if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $email = $_POST["email"] ?? "";
        $token = $_POST["token"] ?? "";

        if(empty($email) || empty($token)) return JSON::serve(400,["message"=>"Champs requis !"]);
        $decodedEmail = jwtDecode($token,"email");
        if(!$decodedEmail) return JSON::serve(401,["message"=>"Token expiré!"]);
        if($email !== $decodedEmail) return JSON::serve(401,["message"=>"Les emails ne correspondent pas"]);

        $User = new User();
        $foundUser = $User->getByEmail($email);
        $foundUser["confirmed_email"] = 1;
        $User->update($foundUser);
        JSON::serve(200,["message"=>"Email confirmed!"]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}



    