<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/friendship-service.php");

use App\JSON\JSON;
use App\FriendShipService\FriendShip;


if($_SERVER["REQUEST_METHOD"] === "POST"){
    $userid = decodeTokenFromHeader();
    if(!$userid) return JSON::serve(401,["message"=>"Connexion requise"]);

    $id = $_POST["id"] ?? "";
    if(!$id) return JSON::serve(400,["message"=>"id requis"]);

    $Friendship  = new FriendShip($userid);
    $success = $Friendship->confirmRequestFrom($id);
   if($success) JSON::serve(200,["message" => "Amitié confirmée"]);
   else JSON::serve(500,['message'=>"Some errors occurs"]);
}
