<?php
require_once("../../config/cors.php");

require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require("../../utils/chech-token.php");

use App\JSON\JSON;
use App\UserService\User;


if($_SERVER["REQUEST_METHOD"] === "GET"){
    $userid = decodeTokenFromHeader();
    
    if(!$userid) return JSON::serve(401,["message"=>"Connexion requise"]);
    $User = new User();
    //on veut récupérer un seul utilisateur
        $user = $User->getById($userid);
        JSON::serve(200,$user);
    }
else{
    JSON::serve(405,["message"=>"Methode non autorisé"]);
}