<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../utils/chech-token.php");
require_once("../../services/auth-service.php");
require_once("../../services/users-service.php");



use App\JSON\JSON;
use App\AuthService\Auth;
use App\PostService\Post;
use App\UserService\User;

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
        $userid = decodeTokenFromHeader();
        $Auth = new Auth($userid);

        if (!$userid) return JSON::serve(401, ["message" => "Connexion requise"]);
        if (!$Auth->isAdmin()) return JSON::serve(403, ["message" => "Acces interdit"]);

        $User = new User();
        $Moderators = $User->getAllModerators();
        JSON::serve(200, $Moderators);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}