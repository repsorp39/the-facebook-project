<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/friendship-service.php");

use App\JSON\JSON;
use App\FriendShipService\FriendShip;


if($_SERVER["REQUEST_METHOD"] === "DELETE"){
    try {
        $userid = decodeTokenFromHeader();
        if(!$userid) return JSON::serve(401,["message"=>"Connexion requise"]);

        $id = $_GET["id"] ?? "";
        if(!$id) return JSON::serve(400,["message"=>"L'id est requis"]);

        $Friendship  = new FriendShip($userid);
        $Friendship->remove($id);
        JSON::serve(200,["message" => "Utilisateur retiré!"]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}