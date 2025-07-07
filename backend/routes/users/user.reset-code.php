<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require_once("../../utils/token-handler.php");
require_once("../../services/email-service.php");

use App\JSON\JSON;
use App\UserService\User;
use App\EmailService\Email;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $email = $_POST["email"];
        if(empty($email)) return JSON::serve(400,["message"=>"Email requis"]);
        $User = new User();
        $foundUser = $User->getByEmail($email);
        if(!$foundUser) return JSON::serve(404,[]);
        $otp = substr(uniqid(),0,6);
        Email::send(["email"=>$email],$otp,"reset");
        $foundUser["reset_token"] = encodeForConfirmation($otp,"otp");
        $User->update($foundUser);
        JSON::serve(200,["message"=>"Code envoyé"]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}
