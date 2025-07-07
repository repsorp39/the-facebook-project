<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/friendship-service.php");

use App\JSON\JSON;
use App\FriendShipService\FriendShip;


if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $userid = decodeTokenFromHeader();
        if(!$userid) return JSON::serve(401,["message"=>"Connexion requise"]);

        $id = $_POST["id"] ?? "";
        if(!$id) return JSON::serve(400,["message"=>"id requis"]);

        $Friendship  = new FriendShip($userid);
        $success = $Friendship->sendRequestTo($id);
        if($success) return JSON::serve(200,["message" => "invitation envoyée"]);
        else JSON::serve(500,["message" => "Could not saved"]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}