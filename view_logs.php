<?php
// Minimal log viewer for free-tier (no shell)
header('Content-Type: text/plain; charset=UTF-8');

function tail_file($path, $maxLines = 200) {
    if (!file_exists($path)) {
        return "[missing] $path\n";
    }
    $content = file($path, FILE_IGNORE_NEW_LINES);
    if ($content === false) {
        return "[unreadable] $path\n";
    }
    $start = max(0, count($content) - $maxLines);
    $slice = array_slice($content, $start);
    return implode("\n", $slice) . "\n";
}

// Prefer /tmp files (Render ephemeral disk)
$logFile = getenv('LOG_FILE') ?: (is_writable('/tmp') ? '/tmp/email_log.txt' : __DIR__ . '/email_log.txt');
$backupFile = getenv('BACKUP_FILE') ?: (is_writable('/tmp') ? '/tmp/appointments_backup.txt' : __DIR__ . '/appointments_backup.txt');

echo "==== email_log (last 200 lines) ====\n";
echo tail_file($logFile, 200);

echo "\n==== appointments_backup (last 50 lines) ====\n";
echo tail_file($backupFile, 50);

?>


