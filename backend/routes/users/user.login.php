<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require_once("../../utils/token-handler.php");

use App\JSON\JSON;
use App\UserService\User;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $User = new User();
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        if(empty($email) || empty($password)){
            return JSON::serve(400,["message"=>"Tous les champs sont requis"]);
        }

        $foundUser = $User->getByEmail($email);
        if(!$foundUser){
            return JSON::serve(400,["message"=>"Mot de passe/email incorrecte"]);
        }

        $passwordMatch = password_verify($password,$foundUser['password']);
        if(!$passwordMatch)  return JSON::serve(400,["message"=>"Mot de passe/email incorrecte"]);

        $token = jwtEncode($foundUser['id']);

        //set as online
        $foundUser['is_online'] = 1;
        $User->update($foundUser);
        JSON::serve(200,[
            "message"=>"Sucessfully connected",
            "token" => $token
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo $e->getMessage();
    }
}else{
    JSON::serve(405,["message"=>"Methode non autorisé"]);
}