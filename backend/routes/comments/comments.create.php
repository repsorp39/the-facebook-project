<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../services/comments-service.php");
require_once("../../utils/chech-token.php");

use App\JSON\JSON;
use App\CommentService\Comment;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $user_id = decodeTokenFromHeader();
        if(!$user_id) {
            return JSON::serve(401, ["message" => "Utilisateur non authentifié"]);
        }

        // Récupération des données du formulaire
        $content = strip_tags($_POST["content"] ?? '');
        $post_id = $_POST["post_id"] ?? "";        
        // Vérification de l'authentification 
        
        if(!$content || !$post_id){
             return JSON::serve(400, ["message" => "Champs requis manquants"]);
        }

        // Création de l'article
        $Comment = new Comment();
        
        $commentData = [
            "user_id" => $user_id,
            "content" => $content,
            "post_id" => $post_id
        ];

        $success = $Comment->create($commentData);

        if($success) {
            $status = 201;
            $response = [
                "message" => "Commentaire créé avec succès",
                "data" => $commentData
            ];
        } else {
            $status = 500;
            $response = [
                "message" => "Erreur lors de la création du commentaire"
            ];
        }

        JSON::serve($status, $response);
        
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
} 