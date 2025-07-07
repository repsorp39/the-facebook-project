<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/message-service.php");

use App\JSON\JSON;
use App\MessageService\Message;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    try {
        $userid = decodeTokenFromHeader();
        if (!$userid) return JSON::serve(401, ["message" => "Connexion requise"]);

        $messageid = $_GET["id"] ?? "";
        $Message = new Message($userid);
        $success = $Message->delete($messageid);
        if($success) {
            JSON::serve(200, ["message" => "Message supprimé"]);
        }
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}
