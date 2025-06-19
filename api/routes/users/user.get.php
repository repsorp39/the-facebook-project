<?php
session_start();
require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");

use App\JSON\JSON;
use App\UserService\User;


if($_SERVER["REQUEST_METHOD"] === "GET"){
    if(!isset($_SESSION['id'])){
        return JSON::serve(401,["message"=>"Connexion requise"]);
    }
    $User = new User();
    //on veut récupérer un seul utilisateur
    if(!isset($_GET["all"])){
        $user = $User->getById($_GET['id']);
        JSON::serve(200,$user);
    }else{
        $users = $User->getAll($_GET['page'] ?? 1);
        JSON::serve(200,$users);
    }

}
else{
    JSON::serve(405,["message"=>"Methode non autorisé"]);
}