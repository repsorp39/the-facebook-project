<?php
session_start();
require_once("../../services/users-service.php");
require_once("../../utils/serve-json.php");

use App\JSON\JSON;
use App\UserService\User;

$User = new User();
$foundUser = $User->getById($_SESSION["id"]);
$foundUser["is_online"] = 0;
$User->update($foundUser);
session_destroy();
JSON::serve(200,["message"=>"Disconnected"]);