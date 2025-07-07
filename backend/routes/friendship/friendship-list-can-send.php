<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/friendship-service.php");

use App\JSON\JSON;
use App\FriendShipService\FriendShip;


if($_SERVER["REQUEST_METHOD"] === "GET"){
    try {
        $userid = decodeTokenFromHeader();
        if(!$userid) return JSON::serve(401,["message"=>"Connexion requise"]);
        $Friendship  = new FriendShip($userid);
        $friends = $Friendship->getAllPossibleRequestSent();
        JSON::serve(200,$friends);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}