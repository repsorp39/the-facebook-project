<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/message-service.php");

use App\JSON\JSON;
use App\MessageService\Message;

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
        $userid = decodeTokenFromHeader();
        if (!$userid) return JSON::serve(401, ["message" => "Connexion requise"]);
        $Message = new Message($userid);
        $friend_id = ( isset($_GET["friend_id"]) && !empty($_GET["friend_id"])) ? $_GET["friend_id"]:"";
        $messages = $friend_id ?  $Message->getAllWithOneContact($friend_id) : $Message->getPreview();
        JSON::serve(200,$messages);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}