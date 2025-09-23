<?php
// Simple entry point for Render webservice
// Just serve the main HTML file

// Set proper headers
header('Content-Type: text/html; charset=UTF-8');

// Serve the main website
include 'index.html';
?>
