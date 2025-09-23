<?php
// Main entry point for Render webservice
// This file handles routing and serves the appropriate content

// Set proper headers
header('Content-Type: text/html; charset=UTF-8');
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

// Remove query parameters for routing
$path = strtok($path, '?');

// Route requests
switch ($path) {
    case '/':
    case '/index.html':
        // Serve the main website
        include 'index.html';
        break;
        
    case '/send_email_simple_render.php':
        // Handle appointment form submission
        include 'send_email_simple_render.php';
        break;
        
    case '/test_endpoint.php':
        // Test endpoint
        include 'test_endpoint.php';
        break;
        
    case '/admin-appointments.html':
        // Admin page
        include 'admin-appointments.html';
        break;
        
    case '/contact-form-handler.html':
        // Contact form handler
        include 'contact-form-handler.html';
        break;
        
    default:
        // Check if it's a static file
        if (file_exists('.' . $path)) {
            // Serve static files
            $mime_type = mime_content_type('.' . $path);
            header('Content-Type: ' . $mime_type);
            readfile('.' . $path);
        } else {
            // 404 - serve main page
            include 'index.html';
        }
        break;
}
?>
