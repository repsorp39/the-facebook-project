<?php
require_once("../../config/cors.php");
require_once("../../services/users-service.php");
require_once("../../utils/serve-json.php");
require("../../utils/chech-token.php");

use App\JSON\JSON;
use App\UserService\User;

if($_SERVER["REQUEST_METHOD"] === "DELETE"){
    try {
        $userid = decodeTokenFromHeader();
        if(!$userid) return JSON::serve(401,["message"=>"Not allowed!"]);

        $User = new User();

        $foundUser = $User->getById($userid);
        $foundUser["is_online"] = 0;
        $User->update($foundUser);
        JSON::serve(200,["message"=>"Disconnected"]);
    } catch (Exception $e) {
        JSON::serve(500, ["error" => $e->getMessage()]);
    }
}