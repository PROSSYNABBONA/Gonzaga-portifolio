<?php
// Test PHP functionality on Render
header('Content-Type: application/json');

$response = [
    'status' => 'success',
    'message' => 'PHP is working on Render!',
    'php_version' => phpversion(),
    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'request_method' => $_SERVER['REQUEST_METHOD'],
    'timestamp' => date('Y-m-d H:i:s'),
    'post_data' => $_POST
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>

