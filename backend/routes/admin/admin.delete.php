<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");
require("../../services/auth-service.php");
require("../../services/users-service.php");



use App\JSON\JSON;
use App\AuthService\Auth;

use App\UserService\User;

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $userid = decodeTokenFromHeader();
    $Auth = new Auth($userid);

    if (!$userid)  JSON::serve(401, ["message" => "Connexion requise"]);
    if (!$Auth->isAdmin())  JSON::serve(403, ["message" => "Acces interdit"]);

    $User = new User();
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data["ids"]) && is_array($data["ids"])) {
        $errors = [];
        $success = [];

        foreach ($data["ids"] as $id) {
            try {
                $checkadmin = new Auth($id);
                if($checkadmin->isAdmin()) {
                    $User->delete($id);
                    $success[] = $id;
                } else {
                    $errors[] = "L'utilisateur $id n'est pas un admin";
                }
            } catch (Exception $e) {
                $errors[] = "Erreur lors du traitement de l'ID $id: " . $e->getMessage();
            }
        }

        if (empty($errors)) {
             JSON::serve(200, [
                "message" => "Tous les admins ont été supprimés avec succès",
                "processed" => $success
            ]);
        } else {
             JSON::serve(400, [
                "message" => "Certaines opérations ont échoué",
                "errors" => $errors,
                "success" => $success
            ]);
        }
    }

}