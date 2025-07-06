<?php
require_once __DIR__ . '/../../services/posts-service.php';
require_once __DIR__ . '/../../utils/serve-json.php';
require_once __DIR__ . '/../../utils/chech-token.php';
require_once("../../config/cors.php");

use App\PostService\Post;
use App\JSON\JSON;

// header('Content-Type: application/json');

if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $userid = decodeTokenFromHeader();
        if(!$userid) {
            JSON::serve(401, ['error' => 'Not allowed!']);
            exit;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $post_id = $_POST['post_id'] ?? '';
            if (!$post_id) {
                JSON::serve(400, ['error' => 'post_id requis']);
                exit;
            }
            $postService = new Post();
            $success = $postService->like($post_id, $userid);
            if ($success) {
                JSON::serve(200, ['message' => 'Post liké']);
            } else {
                JSON::serve(500, ['error' => 'Erreur lors du like']);
            }
            exit;
        }
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $userid = decodeTokenFromHeader();
    if(!$userid) {
        JSON::serve(401, ['error' => 'Not allowed!']);
        exit;
    }
    $post_id = $_GET['post_id'] ?? '';
    if (!$post_id) {
        JSON::serve(400, ['error' => 'post_id requis']);
        exit;
    }
    $postService = new Post();
    $success = $postService->dislike($post_id, $userid);
    if ($success) {
        JSON::serve(200, ['message' => 'Like retiré']);
    } else {
        JSON::serve(500, ['error' => 'Erreur lors du dislike']);
    }
    exit;
}