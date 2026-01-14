<?php
// contact.php
// Works only when served via a PHP server (not by opening index.html as a local file).

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
    } elseif (empty($message)) {
        echo "Message cannot be empty";
    } else {
        // Здесь могла бы быть отправка письма: mail("admin@city.com", "Support Request", $message);
        echo "<h1>Success!</h1><p>Your message has been sent to Municipal Services.</p>";
    }
} else {
    echo "<h1>Contact endpoint</h1><p>Send a POST request with <code>email</code> and <code>message</code>.</p>";
}
?>