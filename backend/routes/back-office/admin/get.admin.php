<?php
require_once("../../../config/cors.php");
require_once("../../../utils/serve-json.php");
require("../../../utils/chech-token.php");
require("../../../services/auth-service.php");
require("../../../services/users-service.php");



use App\JSON\JSON;
use App\AuthService\Auth;
use App\UserService\User;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $userid = decodeTokenFromHeader();
    $Auth = new Auth($userid);

    if (!$userid) {
        JSON::serve(401, ["message" => "Connexion requise"]);
        exit();
    }
    if (!$Auth->isAdmin()) {
        JSON::serve(403, ["message" => "Acces interdit"]);
        exit();
    }

    $User = new User();
    $Admins = $User->getAllAdmins();
    if (empty($Admins)) {
        JSON::serve(404, ["message" => "Aucun admin trouvé"]);
    } else {
        JSON::serve(200, ["message" => "Admins récupérés avec succès", "data" => $Admins]);
    }
}