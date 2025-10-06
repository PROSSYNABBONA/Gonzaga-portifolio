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

// Let PHP's built-in server serve existing static files (images, videos, css, js, etc.)
// When using a router script, returning false delegates to the built-in server
if (php_sapi_name() === 'cli-server') {
    $staticPath = __DIR__ . urldecode($path);
    if (is_file($staticPath)) {
        return false;
    }
}

// Route requests
if ($path === '/send_email_simple_render.php' || strpos($path, 'send_email_simple_render.php') !== false || $path === '/api/send-appointment') {
    // Handle appointment form submission
    include 'send_email_simple_render.php';
} elseif ($path === '/test_endpoint.php' || strpos($path, 'test_endpoint.php') !== false) {
    // Test endpoint
    include 'test_endpoint.php';
} elseif ($path === '/view_logs.php' || strpos($path, 'view_logs.php') !== false) {
    include 'view_logs.php';
} elseif (strpos($path, '/videos/') === 0) {
    // Serve MP4 videos with correct headers (and byte-range support)
    $videoFile = __DIR__ . urldecode($path);
    if (is_file($videoFile)) {
        $size = filesize($videoFile);
        $start = 0;
        $length = $size;
        $end = $size - 1;
        header('Content-Type: video/mp4');
        header('Accept-Ranges: bytes');
        if (isset($_SERVER['HTTP_RANGE'])) {
            // bytes=START-END
            if (preg_match('/bytes=([0-9]*)-([0-9]*)/', $_SERVER['HTTP_RANGE'], $m)) {
                if ($m[1] !== '') { $start = (int)$m[1]; }
                if ($m[2] !== '') { $end = (int)$m[2]; }
                if ($end >= $size) { $end = $size - 1; }
                if ($start > $end) { $start = 0; }
                $length = $end - $start + 1;
                header("HTTP/1.1 206 Partial Content");
                header("Content-Range: bytes $start-$end/$size");
            }
        }
        header("Content-Length: $length");
        $chunk = 8192;
        $fp = fopen($videoFile, 'rb');
        if ($start > 0) { fseek($fp, $start); }
        $bytesSent = 0;
        while (!feof($fp) && $bytesSent < $length) {
            $read = ($length - $bytesSent) > $chunk ? $chunk : ($length - $bytesSent);
            $buffer = fread($fp, $read);
            echo $buffer;
            flush();
            $bytesSent += strlen($buffer);
        }
        fclose($fp);
        exit;
    }
} else {
    // Serve the main website
    header('Content-Type: text/html; charset=UTF-8');
    include 'index.html';
}
?>
