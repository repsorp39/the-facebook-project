<?php
require_once("../../../config/cors.php");
require_once("../../../utils/serve-json.php");
require("../../../utils/chech-token.php");
require("../../../services/auth-service.php");
require("../../../services/users-service.php");
require("../../../services/users-service.php");


use App\JSON\JSON;
use App\AuthService\Auth;
use App\PostService\Post;


if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $userid = decodeTokenFromHeader();
    $Auth = new Auth($userid);

    if (!$userid)  JSON::serve(401, ["message" => "Connexion requise"]);
    if (!$Auth->isModerator())  JSON::serve(403, ["message" => "Acces interdit"]);

    $Post = new Post();
    $posts=$Post->getAll( );
    if (empty($posts))  JSON::serve(401, ["message" => "Erreur lors de la recuperation des posts"]);
    else  JSON::serve(401, ["message" => "Recuperation reussie"]);
}