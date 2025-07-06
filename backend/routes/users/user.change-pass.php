<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require("../../utils/handle-upload.php");
require("../../utils/chech-token.php");

use App\JSON\JSON;
use App\UserService\User;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $userid = decodeTokenFromHeader();
        
        if(!$userid) return JSON::serve(401,["message"=>"Not allowed!"]);

        $User = new User();
        $oldPassword = $_POST["old_password"] ?? '';
        $newPassword = $_POST["new_password"] ?? '';

        if(empty($oldPassword) || empty($newPassword)) return JSON::serve(401,["message"=>"Ancien et nouveau mot de passe requis"]);

        $foundUser = $User->getById($userid);

        $passwordMatch = password_verify($oldPassword,$foundUser["password"]);
        if(!$passwordMatch) return JSON::serve(403,["message"=>"Mot de passe incorrecte"]);

        $foundUser["password"] = password_hash($newPassword,PASSWORD_BCRYPT);
        $success = $User->update($foundUser);
        if($success) JSON::serve(200,["message"=>"Password edited!"]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}
