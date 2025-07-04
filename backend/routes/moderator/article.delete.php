<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/auth-service.php");
require("../../services/users-service.php");
require("../../services/posts-service.php");


use App\JSON\JSON;
use App\AuthService\Auth;
use App\PostService\Post;
use App\UserService\User;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $userid = decodeTokenFromHeader();
    $Auth = new Auth($userid);

    if (!$userid)  JSON::serve(401, ["message" => "Connexion requise"]);
    if (!$Auth->isModerator())  JSON::serve(403, ["message" => "Acces interdit"]);

    $Post = new Post();
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data["post_ids"]) && is_array($data["post_ids"])) {
        foreach ($data["post_ids"] as $post_id) {
            $Post->delete($post_id);
        }
         JSON::serve(200, ["message" => "Posts supprimés"]);
    } else {
         JSON::serve(400, ["message" => "Liste d'IDs invalide"]);
    }
}