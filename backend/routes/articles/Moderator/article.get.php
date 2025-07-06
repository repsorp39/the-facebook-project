<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/auth-service.php");
require("../../services/users-service.php");
require("../../../services/users-service.php");


use App\JSON\JSON;
use App\AuthService\Auth;
use App\PostService\Post;
use App\UserService\User;

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
        $userid = decodeTokenFromHeader();
        $Auth = new Auth($userid);

        if (!$userid) return JSON::serve(401, ["message" => "Connexion requise"]);
        if (!$Auth->isModerator()) return JSON::serve(403, ["message" => "Acces interdit"]);

        $Post = new Post();
        $posts=$Post->getAll( );
        if (empty($posts)) return JSON::serve(401, ["message" => "Erreur lors de la recuperation des posts"]);
        else return JSON::serve(401, ["message" => "Recuperation reussie"]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}