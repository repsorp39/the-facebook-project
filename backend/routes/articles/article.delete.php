<?php
session_start();
require_once __DIR__ . '/../../utils/serve-json.php';
require_once __DIR__ . '/../../services/posts-service.php';

use App\PostService\Post;
use App\JSON\JSON;

header('Content-Type: application/json');

if (isset($_GET['post_id'])) {
    $post_id = $_GET['post_id'];
    $post = new Post();
    $delete = $post->delete($post_id);

    if ($delete) {
        JSON::serve(200, ["message" => "Article supprimé avec succès"]);
    } else {
        JSON::serve(404, ["error" => "Article non trouvé ou suppression impossible"]);
    }
} else {
    JSON::serve(400, ["error" => "Paramètre post_id manquant"]);
}



