<?php
require_once("../../config/cors.php");
require_once("../../utils/serve-json.php");
require_once("../../services/stat-service.php");

use App\StatService\StatService;
use App\JSON\JSON;

if($_SERVER['REQUEST_METHOD'] === "GET"){
    $statService = new StatService();
    $stats = $statService->getStats();
    JSON::serve(200,['data' => $stats]);
}