<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require_once("../../services/posts-service.php");
require_once("../../services/friendship-service.php");
require("../../utils/chech-token.php");

use App\JSON\JSON;
use App\FriendShipService\FriendShip;
use App\PostService\Post;

if($_SERVER["REQUEST_METHOD"] === "GET"){
    try {
        $userid = decodeTokenFromHeader();
        $friendId = $_GET["id"] ?? "";
        if(!$userid || !$friendId) return JSON::serve(401,["message"=>"Connexion requise ou id requis"]);
       
        //get latest  posts
        $Post = new Post();
        $posts = $Post->getLastUserPosts($friendId);
        
        //get friendship informations
        $FriendShip = new FriendShip($friendId);
        $friends = $FriendShip->getFriendshipList();

        JSON::serve(200,[
            "posts" => $posts,
            "friends" => $friends
        ]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}