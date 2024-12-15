<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        # Sender Data
        $name    = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["full-name"])));
        $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = $_POST["message"] ? trim($_POST["message"]) : '';
        
        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            # Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Please complete the form and try again.";
            exit;
        }
        
        # Mail Content
        $content = "$name\n";
        $content .= "$email\n";
        $content .= "$message";
        
        include('Mail.php');

        $recipients = 'simabeats@gmail.com';
        
        $headers['From']    = 'hello@marcell.solutions';
        $headers['To']      = $recipients;
        $headers['Subject'] = 'RFQ from marcell.solutions - '.date('Y-m-d H:i:s');
        
        $params['sendmail_path'] = '/usr/lib/sendmail';
        
        // Create the mail object using the Mail::factory method
        $mail =& Mail::factory('sendmail', $params);
        
        $success = $mail->send($recipients, $headers, $content);
        
        if ($success) {
            # Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            # Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong, we couldn't send your message.";
        }

    } else {
        # Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
