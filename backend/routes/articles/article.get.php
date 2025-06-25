<?php
require_once __DIR__ . '/../../services/posts-service.php';
require_once __DIR__ . '/../../utils/serve-json.php';
require_once __DIR__ . '/../../utils/chech-token.php';
require_once("../../config/cors.php");

use App\PostService\Post;
use App\JSON\JSON;

header('Content-Type: application/json');

$userid = decodeTokenFromHeader();
echo $userid;
if(!$userid) {
    JSON::serve(401, ['error' => 'Not allowed!']);
    exit;
}

try {
    $postService = new Post();

    if (isset($_GET['id'])) {
        $article = $postService->getById($_GET['id']);
        if ($article) {
            JSON::serve(200, $article);
        } else {
            JSON::serve(404, ['error' => 'Article not found']);
        }
    } else {
        $userId = $_GET['user_id'] ?? ''; 
        $articles = $postService->getAll($userId);
        JSON::serve(200, $articles);
    }
} catch (Exception $e) {
    JSON::serve(500, ['error' => $e->getMessage()]);
}
