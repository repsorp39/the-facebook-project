<?php
require_once("../../config/cors.php");

require_once("../../utils/serve-json.php");
require_once("../../services/comments-service.php");
require_once("../../utils/handle-upload.php");
require_once("../../utils/chech-token.php");

use App\JSON\JSON;
use App\CommentService\Comment;

if($_SERVER['REQUEST_METHOD'] === "DELETE"){
    try {
        $userid = decodeTokenFromHeader();
        if(!$userid) {
            JSON::serve(401, ["error" => "Non autorisé!"]);
            exit;
        }

        if (isset($_GET['comment_id']) && !empty($_GET['comment_id'])) {
            $comment_id = $_GET['comment_id'];
            $Comment = new Comment();
            $comment = $Comment->getById($comment_id);
            if(!$comment) {
                JSON::serve(404, ["error" => "Commentaire non trouvé"]);
                exit;
            }
            if($comment['user_id'] != $userid) {
                JSON::serve(403, ["error" => "Vous n'avez pas le droit de supprimer ce commentaire"]);
                exit;
            }
            $delete = $Comment->delete($comment_id);

            if ($delete) {
                JSON::serve(200, ["message" => "Commentaire supprimé avec succès"]);
            } else {
                JSON::serve(404, ["error" => "Commentaire non trouvé ou suppression impossible"]);
            }
        } else {
            JSON::serve(400, ["error" => "Paramètre comment_id manquant"]);
        }
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}
