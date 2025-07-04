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
    $Moderators = $User->getAllModerators();
    if (empty($Moderators))  JSON::serve(404, ["message" => "Aucun modérateur trouvé"]);
    else  JSON::serve(200, ["message" => "Modérateurs récupérés avec succès", "data" => $Moderators]);
}