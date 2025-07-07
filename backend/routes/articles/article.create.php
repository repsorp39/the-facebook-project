<?php
require_once("../../config/cors.php");

require_once("../../utils/serve-json.php");
require_once("../../services/posts-service.php");
require_once("../../utils/handle-upload.php");
require_once("../../utils/chech-token.php");

use App\JSON\JSON;
use App\PostService\Post;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        // Récupération des données du formulaire
        $description = strip_tags($_POST["description"] ?? '');
        $type = strip_tags($_POST["type"] ?? 'text');
        
        // Vérification de l'authentification 
       
        $user_id = decodeTokenFromHeader();
        if(!$user_id) {
            return JSON::serve(401, ["message" => "Utilisateur non authentifié"]);
        }

        // Validation des champs requis
        if($type === "text" && empty($description)) {
            return JSON::serve(400, ["message" => "La description est requise"]);
        }

        // Validation du type
        $allowedTypes = ['text', 'image', 'video'];
        if(!in_array($type, $allowedTypes)) {
            return JSON::serve(400, ["message" => "Type non autorisé. Types autorisés: text, image, video"]);
        }

        $content = '';
        
        // Gestion de l'upload de fichier si présent
        if($type !== 'text' && array_key_exists('content', $_FILES)) {
            $fileType = ($type === 'image') ? 'image' : 'video';
            $content = handleUpload($_FILES["content"], $fileType);
        }

        // Création de l'article
        $Post = new Post();
        
        $postData = [
            "user_id" => $user_id,
            "description" => $description,
            "content" => $content,
            "type" => $type
        ];

        $success = $Post->create($postData);

        if($success) {
            $status = 201;
            $response = [
                "message" => "Article créé avec succès",
                "data" => $postData
            ];
        } else {
            $status = 500;
            $response = [
                "message" => "Erreur lors de la création de l'article"
            ];
        }

        JSON::serve($status, $response);
        
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
} 