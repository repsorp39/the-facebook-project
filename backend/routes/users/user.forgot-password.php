<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require_once("../../utils/token-handler.php");
require_once("../../services/email-service.php");

use App\JSON\JSON;
use App\UserService\User;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $email = $_POST['email'];
    $otp = $_POST['otp'];
    $newPassword = $_POST["password"];
    $foundUser = $User->getByEmail($email); 
    $User = new User();
    $savedOtp = jwtDecode($foundUser["reset-token"],'otp');
    if(!$savedOtp || $savedOtp !== $otp) return JSON::serve(403,["message"=>"Code incorrecte ou  expiré"]);
    $foundUser["password"] = password_hash($newPassword,PASSWORD_BCRYPT);
    JSON::serve(200,["message" => "Mot de passe modifiée"]);
}   