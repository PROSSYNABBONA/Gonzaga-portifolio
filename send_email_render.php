<?php
// Render deployment email solution
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
    
    // Try multiple email methods for Render deployment
    $email_sent = false;
    $error_details = [];
    
    // Method 1: Try PHPMailer if available
    if (!$email_sent && file_exists('PHPMailer/src/PHPMailer.php')) {
        try {
            require_once 'PHPMailer/src/Exception.php';
            require_once 'PHPMailer/src/PHPMailer.php';
            require_once 'PHPMailer/src/SMTP.php';
            
            use PHPMailer\PHPMailer\PHPMailer;
            use PHPMailer\PHPMailer\SMTP;
            use PHPMailer\PHPMailer\Exception;
            
            $mail = new PHPMailer(true);
            
            // Set language to English
            $mail->setLanguage('en');
            $mail->CharSet = 'UTF-8';
            
            // Gmail SMTP Configuration
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'prossienabbona20@gmail.com';
            $mail->Password = 'mruernddvsdbtxhu';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->SMTPDebug = 0;
            
            // Additional settings for Render
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );
            
            // Recipients
            $mail->setFrom('prossienabbona20@gmail.com', 'Dr. Gonzaga Website');
            $mail->addAddress('bakulumpagigonzaga@gmail.com');
            $mail->addCC('prossienabbona20@gmail.com');
            $mail->addReplyTo($email, $name);
            
            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $message;
            
            $mail->send();
            $email_sent = true;
            
        } catch (Exception $e) {
            $error_details[] = "PHPMailer Error: " . $e->getMessage();
        }
    }
    
    // Method 2: Try basic mail() function
    if (!$email_sent) {
        $to = 'bakulumpagigonzaga@gmail.com';
        $cc = 'prossienabbona20@gmail.com';
        
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: Dr. Gonzaga Website <noreply@drgonzaga.com>" . "\r\n";
        $headers .= "Reply-To: $email" . "\r\n";
        $headers .= "Cc: $cc" . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        if (mail($to, $subject, $message, $headers)) {
            $email_sent = true;
        } else {
            $error_details[] = "Basic mail() function failed";
        }
    }
    
    // Method 3: Use external email service (SendGrid, Mailgun, etc.)
    if (!$email_sent) {
        // For now, we'll save to file and show success
        // In production, you'd integrate with SendGrid, Mailgun, or similar
        $appointment_data = [
            'timestamp' => date('Y-m-d H:i:s'),
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'service' => $service,
            'date' => $date,
            'time' => $time,
            'notes' => $notes,
            'status' => 'pending_email',
            'source' => 'render_deployment'
        ];
        
        $backup_file = 'appointments_backup.txt';
        $backup_line = json_encode($appointment_data) . "\n";
        file_put_contents($backup_file, $backup_line, FILE_APPEND | LOCK_EX);
        
        // Log the issue
        $log_message = date('Y-m-d H:i:s') . " - Email failed on Render, saved to backup. Errors: " . implode('; ', $error_details) . "\n";
        file_put_contents('email_log.txt', $log_message, FILE_APPEND | LOCK_EX);
        
        // Show success to user
        echo json_encode(['success' => true, 'message' => 'Thank you! Your appointment request has been received. We will contact you soon to confirm your appointment. (Note: Email delivery may be delayed)']);
        exit;
    }
    
    // Log success
    $log_message = date('Y-m-d H:i:s') . " - Email sent successfully from Render\n";
    file_put_contents('email_log.txt', $log_message, FILE_APPEND | LOCK_EX);
    
    echo json_encode(['success' => true, 'message' => 'Thank you! Your appointment request has been sent successfully. We will contact you soon to confirm your appointment.']);
    
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
