<?php

require_once "Mail.php"; // Include the PEAR Mail package

$headers = array(
    'From' => 'test@ses.',
    'To' => 'simabeats@gmail.com',
    'Subject' => 'TTTT'
);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$mail = Mail::factory("smtp", array(
    'host' => 'marcell.solutions',
    'port' => 465,
    'auth' => true,
    'username' => 'hello@marcell.solutions',
    'password' => '6mH}YQL&5250'
));

// Send the email
$result = $mail->send('simabeats@gmail.com', $headers, 'TESTT');
var_dump($result);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        # FIX: Replace this email with recipient email
        $mail_to = "simabeats@gmail.com";
        
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
        $content = "Name: $name\n";
        $content .= "Message:\n$message\n";

        # email headers.
        $headers = "From: $name <$email>";

        # Send the email.
        $success = mail($mail_to, 'New message from marcell.solutions', $content, $headers);
        var_dump($success);
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
