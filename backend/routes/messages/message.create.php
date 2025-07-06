<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/message-service.php");
require("../../utils/handle-upload.php");

use App\JSON\JSON;
use App\MessageService\Message;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $userid = decodeTokenFromHeader();
        if (!$userid) return JSON::serve(401, ["message" => "Connexion requise"]);

        $receiver = $_POST["user_id"] ?? "";
        $type = strip_tags($_POST["type"] ?? "");
        $content = strip_tags($_POST["content"] ?? "");
        $description = strip_tags($_POST["description"] ?? "");

        if (empty($receiver)  || empty($type)) {
            return JSON::serve(400, ["message" => "Tous les champs sont requis"]);
        }

        $allowedTypes = ["video", "audio", "text", "image"];
        if (!in_array($type, $allowedTypes)) {
            return JSON::serve(400, ["message" => "Types autorisés: video,audio,text"]);
        }
            //cas ou ce serait un media
            if (array_key_exists("media", $_FILES))  {
                //si une erreur survient
                if($_FILES["media"]["error"] === 1){
                    return JSON::serve(500,["message" => "Une erreur est survenue lors de l'upload"]);
                    exit;
                }
                $mimeType = mime_content_type($_FILES["media"]["tmp_name"]);
                if (!str_starts_with($mimeType, $type)) {
                    return JSON::serve(400, ["message" => "Le fichier envoyé ne correspond pas au type spécifié"]);
                }
                $content = handleUpload($_FILES["media"], $type);
            }

        $Message = new Message($userid);
        $message = [
            "type"    => $type,
            "content" => $content,
            "description" => $description,
            "id"      => $receiver
        ];
        $success = $Message->create($message);
        if ($success) {
            JSON::serve(200, ["message" => "Message envoyé"]);
        }
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}
