<?php
require_once __DIR__ . '/../../services/posts-service.php';
require_once __DIR__ . '/../../utils/serve-json.php';
require_once __DIR__ . '/../../utils/chech-token.php';
require_once("../../config/cors.php");

use App\PostService\Post;
use App\JSON\JSON;


if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $userid = decodeTokenFromHeader();
    if (!$userid) {
        JSON::serve(401, ['error' => 'Not allowed!']);
        exit;
    }

    try {
        $postService = new Post();

        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $article = $postService->getById($_GET['id']);
            if ($article) {
                JSON::serve(201, $article);
            } else {
                JSON::serve(404, ['error' => 'Article not found']);
            }
        } else {
            $articles = $postService->getAll();
            JSON::serve(200, $articles);
        }
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}
