<?php
require_once("../../config/cors.php");
require_once __DIR__ . '/../../services/posts-service.php';
require_once __DIR__ . '/../../utils/serve-json.php';
require_once __DIR__ . '/../../utils/chech-token.php';

use App\PostService\Post;
use App\JSON\JSON;


if($_SERVER["REQUEST_METHOD"] === "POST"){
        //recuperation des donnees 
    $input = $_POST;

    $userid = decodeTokenFromHeader();
    if(!$userid) {
        JSON::serve(401, ['error' => 'Not allowed!']);
        exit;
    }
  
    if (!$input || !isset($input['post_id'],  $input['description'])) {
        JSON::serve(400, ['error' => 'Missing required fields']);
        exit;
    }

    // On peut aussi vérifier que $input['user_id'] == $userid pour plus de sécurité
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
        JSON::serve(500, ["error" => $e->getMessage()]);
    }

}