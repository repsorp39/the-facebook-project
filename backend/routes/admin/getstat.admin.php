<?php
header('Content-Type: application/json');

require_once(__DIR__ . '/../../../services/stat-service.php');

use App\StatService\StatService;

try {
    $statService = new StatService();
    $stats = $statService->getStats();
    echo json_encode([
        'success' => true,
        'data' => $stats
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}