<?php
header('Content-Type: application/json');

require_once(__DIR__ . '/../../../services/stat-service.php');

use App\StatService\StatService;

$statService = new StatService();

$stats = $statService->getStats();

echo json_encode([
    'success' => true,
    'data' => $stats
]);