<?php
// Main entry point for Render webservice
// Handle routing for PHP files

// Set CORS headers (content-type set per route)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the requested path
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Route requests
if ($path === '/send_email_simple_render.php' || strpos($path, 'send_email_simple_render.php') !== false || $path === '/api/send-appointment') {
    // Handle appointment form submission
    include 'send_email_simple_render.php';
} elseif ($path === '/test_endpoint.php' || strpos($path, 'test_endpoint.php') !== false) {
    // Test endpoint
    include 'test_endpoint.php';
} elseif ($path === '/view_logs.php' || strpos($path, 'view_logs.php') !== false) {
    include 'view_logs.php';
} else {
    // Serve the main website
    header('Content-Type: text/html; charset=UTF-8');
    include 'index.html';
}
?>
