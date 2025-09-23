<?php
// Simple email handler for Render deployment
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $service = htmlspecialchars(trim($_POST['service'] ?? ''));
    $date = htmlspecialchars(trim($_POST['date'] ?? ''));
    $time = htmlspecialchars(trim($_POST['time'] ?? ''));
    $notes = htmlspecialchars(trim($_POST['notes'] ?? ''));
    
    // Basic validation
    if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($date) || empty($time)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }
    
    // Create email message
    $subject = 'New Appointment Booking - Dr. Gonzaga Veterinary Services';
    
    $message = "
    <html>
    <head>
        <title>New Appointment Booking</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
            .label { font-weight: bold; color: #007bff; display: inline-block; width: 150px; }
            .value { margin-left: 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🐾 New Appointment Booking</h2>
                <p>Dr. Gonzaga Veterinary Services</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>👤 Name:</span>
                    <span class='value'>$name</span>
                </div>
                <div class='field'>
                    <span class='label'>📧 Email:</span>
                    <span class='value'>$email</span>
                </div>
                <div class='field'>
                    <span class='label'>📞 Phone:</span>
                    <span class='value'>$phone</span>
                </div>
                <div class='field'>
                    <span class='label'>🩺 Service:</span>
                    <span class='value'>$service</span>
                </div>
                <div class='field'>
                    <span class='label'>📅 Date:</span>
                    <span class='value'>$date</span>
                </div>
                <div class='field'>
                    <span class='label'>⏰ Time:</span>
                    <span class='value'>$time</span>
                </div>";
    
    if (!empty($notes)) {
        $message .= "
                <div class='field'>
                    <span class='label'>📝 Notes:</span>
                    <span class='value'>$notes</span>
                </div>";
    }
    
    $message .= "
                <div class='field'>
                    <span class='label'>🕐 Booked:</span>
                    <span class='value'>" . date('Y-m-d H:i:s') . "</span>
                </div>
            </div>
            <div class='footer'>
                <p>This email was sent from your website contact form.</p>
                <p>Please respond to confirm the appointment.</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Try to send email using basic mail() function
    $to = 'bakulumpagigonzaga@gmail.com';
    $cc = 'prossienabbona20@gmail.com';
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: Dr. Gonzaga Website <noreply@drgonzaga.com>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Cc: $cc" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    $email_sent = false;
    
    // Try sending email
    if (mail($to, $subject, $message, $headers)) {
        $email_sent = true;
    }
    
    // Always save to backup file for Render
    $appointment_data = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'service' => $service,
        'date' => $date,
        'time' => $time,
        'notes' => $notes,
        'status' => $email_sent ? 'email_sent' : 'email_failed',
        'source' => 'render_deployment'
    ];
    
    $backup_file = 'appointments_backup.txt';
    $backup_line = json_encode($appointment_data) . "\n";
    file_put_contents($backup_file, $backup_line, FILE_APPEND | LOCK_EX);
    
    // Log the attempt
    $log_message = date('Y-m-d H:i:s') . " - Appointment received on Render. Email sent: " . ($email_sent ? 'Yes' : 'No') . "\n";
    file_put_contents('email_log.txt', $log_message, FILE_APPEND | LOCK_EX);
    
    // Always show success to user
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your appointment request has been received. We will contact you soon to confirm your appointment.'
    ]);
    
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>

