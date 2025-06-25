<?php
require_once __DIR__ . '/../../services/posts-service.php';
require_once __DIR__ . '/../../utils/serve-json.php';
require_once __DIR__ . '/../../utils/chech-token.php';

use App\PostService\Post;
use App\JSON\JSON;

header('Content-Type: application/json');

//recuperation des donnees json
$input = json_decode(file_get_contents('php://input'), true);

$userid = decodeTokenFromHeader();
if(!$userid) {
    JSON::serve(401, ['error' => 'Not allowed!']);
    exit;
}

if (!$input || !isset($input['post_id'], $input['user_id'], $input['description'])) {
    JSON::serve(400, ['error' => 'Missing required fields']);
    exit;
}


if ($input['user_id'] != $userid) {
    JSON::serve(403, ['error' => 'Unauthorized user']);
    exit;
}

try {
    $postService = new Post();
    $success = $postService->update($input);

    if ($success) {
        JSON::serve(200, ['message' => 'Article updated successfully']);
    } else {
        JSON::serve(400, ['error' => 'Failed to update article']);
    }
} catch (Exception $e) {
    JSON::serve(500, ['error' => $e->getMessage()]);
}
