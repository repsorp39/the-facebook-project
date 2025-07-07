<?php
require_once("../../config/cors.php");

require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require("../../utils/chech-token.php");

use App\JSON\JSON;
use App\UserService\User;


if($_SERVER["REQUEST_METHOD"] === "GET"){
    try {
        $userid = decodeTokenFromHeader();
        if(!$userid) return JSON::serve(401,["message"=>"Connexion requise"]);
        $User = new User();
        //si il y a un id dans la request on envoit les informations concernant cet utilisateur
        //sinon juste ceux de l'utilisateur connecté
        $request_id = $_GET["id"] ?? "";
        if($request_id) $user = $User->getById($request_id);
        else $user = $User->getById($userid);
        
        if($user) JSON::serve(200,$user);
        else JSON::serve(404,[]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}