<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require_once("../../utils/token-handler.php");
require_once("../../services/email-service.php");

use App\JSON\JSON;
use App\UserService\User;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    try{
        $newPassword = $_POST["password"];
        $email = $_POST['email'];
        $otp = $_POST['otp'];
        $User = new User();
        $foundUser = $User->getByEmail($email); 
        $savedOtp = jwtDecode($foundUser["reset_token"],'otp');
        if(!$savedOtp || $savedOtp !== $otp) return JSON::serve(403,["message"=>"Code incorrecte ou  expiré"]);
        $foundUser["password"] = password_hash($newPassword,PASSWORD_BCRYPT);
        $User->update($foundUser);
        JSON::serve(200,["message" => "Mot de passe modifiée"]);
    }catch(Exception $e){
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}   