<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/message-service.php");


use App\JSON\JSON;
use App\MessageService\Message;

                                   //PUT
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $userid = decodeTokenFromHeader();
        if (!$userid) return JSON::serve(401, ["message" => "Connexion requise"]);

        $messageid = $_POST["id"] ?? "";
        if(!$messageid) return JSON::serve(400, ["message" => "id requis"]);

        $content = strip_tags($_POST['content'] ?? '');
        $Message = new Message($userid);
        $success = $Message->update($messageid,$content);
        if($success) {
            JSON::serve(200, ["message" => "Message mis à jour"]);
        }
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}
