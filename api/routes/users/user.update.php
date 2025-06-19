<?php
session_start();
require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require("../../utils/handle-upload.php");

use App\JSON\JSON;
use App\UserService\User;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    if(!$_SESSION['id']) return JSON::serve(401,["message"=>"Not allowed!"]);
    $User = new User();

    //handle picture upload
    if(array_key_exists('picture',$_FILES)){
        $picture = handleUpload($_FILES["picture"],'image');
    }
    $user["id"] = $_SESSION["id"];
    $user["email"] = strip_tags($_POST["email"]);
    $user["firstname"] = strip_tags($_POST["firstname"]);
    $user["lastname"] = strip_tags($_POST["lastname"]);
    $user["is_online"] = 1;
    $user["birthday"] = strip_tags($_POST["birthday"]);
    $user["gender"] = strip_tags($_POST["gender"]);
    $user["picture"] = $picture;
    $user["password"] = $User->getById($_SESSION['id'])["password"];
    $User->update($user);
    JSON::serve(200,["message"=>"Successfully edited!"]);
}else{
    JSON::serve(405,["message"=>"Methode non autorisé"]);
}