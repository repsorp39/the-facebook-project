<?php
require_once("../../config/cors.php");
require_once __DIR__ . '/../../utils/chech-token.php';
require_once __DIR__ . '/../../utils/serve-json.php';
require_once __DIR__ . '/../../services/posts-service.php';
require_once __DIR__ . '/../../services/auth-service.php';


use App\PostService\Post;
use App\AuthService\Auth;

use App\JSON\JSON;


header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] === "DELETE"){
    try {
        $userid = decodeTokenFromHeader();
        if(!$userid) {
            JSON::serve(401, ["error" => "Not allowed!"]);
            exit;
        }

        if (isset($_GET['post_id'])) {
            $post_id = $_GET['post_id'];
            $post = new Post();
            $Auth =new Auth($userid);
            $article = $post->getById($post_id);
            if(!$article) {
                JSON::serve(404, ["error" => "Article non trouvé"]);
                exit;
            }
            if($article['user_id'] != $userid && !$Auth->isModerator() ) {
                return JSON::serve(403, ["error" => "Vous n'avez pas le droit de supprimer cet article"]);
                exit;
            }
            $delete = $post->delete($post_id);

            if ($delete) {
                JSON::serve(200, ["message" => "Article supprimé avec succès"]);
            } else {
                JSON::serve(404, ["error" => "Article non trouvé ou suppression impossible"]);
            }
        } else {
            JSON::serve(400, ["error" => "Paramètre post_id manquant"]);
        }
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }


}
