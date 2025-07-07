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
        $foundUser = $User->getById($userid);
        //handle picture upload
        if(array_key_exists('picture',$_FILES)){
            $user["picture"] = handleUpload($_FILES["picture"],'image');
        }
        $user["email"] = strip_tags($_POST["email"] ?? "");
        $user["firstname"] = strip_tags($_POST["firstname"] ?? "");
        $user["lastname"] = strip_tags($_POST["lastname"] ?? "");
        $user["birthday"] = strip_tags($_POST["birthday"] ?? "");
        $user["gender"] = strip_tags($_POST["gender"] ?? "");

        $user = array_merge($foundUser,array_filter($user));

        $User->update($user);
        JSON::serve(200,["message"=>"Successfully edited!"]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}