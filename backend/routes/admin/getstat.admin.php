<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/auth-service.php");
require("../../services/users-service.php");

use App\JSON\JSON;
use App\AuthService\Auth;
use App\PostService\Post;
use App\UserService\User;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    try {
        $userid = decodeTokenFromHeader();
        $Auth = new Auth($userid);

        if (!$userid) return JSON::serve(401, ["message" => "Connexion requise"]);
        if (!$Auth->isAdmin()) return JSON::serve(403, ["message" => "Acces interdit"]);

        $User = new User();
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data["ids"]) && is_array($data["ids"])) {
            foreach ($data["ids"] as $id) {
                $checkadmin = new Auth($id);
                if($checkadmin->isAdmin($id)) {
                    $User->delete($id);
                    return JSON::serve(200, ["message" => "Admin supprimé avec succès"]);
                } else {
                    return JSON::serve(403, ["message" => "Accès interdit : l'utilisateur n'est pas un admin"]);
                }
            }
        }
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}