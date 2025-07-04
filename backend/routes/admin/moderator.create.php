<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/auth-service.php");
require("../../services/users-service.php");



use App\JSON\JSON;
use App\AuthService\Auth;
use App\UserService\User;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $userid = decodeTokenFromHeader();
    $Auth = new Auth($userid);

    if (!$userid)  JSON::serve(401, ["message" => "Connexion requise"]);
    if (!$Auth->isAdmin())  JSON::serve(403, ["message" => "Acces interdit"]);

    $User = new User();
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data["ids"]) && is_array($data["ids"])) {
        foreach ($data["ids"] as $id) {
            $User->createmoderator($id);
        }
         JSON::serve(200, ["message" => "Moderateur créé avec succès"]);
    } else {
        JSON::serve(400, ["message" => "Echec lors de la création du moderateur"]);
    }
}