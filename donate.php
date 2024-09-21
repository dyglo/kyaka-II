<?php
require_once('vendor/autoload.php');
\Stripe\Stripe::setApiKey('your_stripe_secret_key');

// Default database credentials for testing
$db_host = 'localhost';
$db_name = 'kyaka_ii_donations';
$db_user = 'kyaka_admin';
$db_pass = 'kyaka_test_password';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Server-side validation
    $amount = filter_input(INPUT_POST, "amount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
    $paymentMethod = filter_input(INPUT_POST, "paymentMethod", FILTER_SANITIZE_STRING);

    $errors = [];

    if (!$amount || $amount <= 0) {
        $errors[] = "Please enter a valid donation amount.";
    }

    if (!$name || strlen($name) < 2) {
        $errors[] = "Please enter a valid name.";
    }

    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address.";
    }

    if (!in_array($paymentMethod, ['creditCard', 'paypal', 'bankTransfer'])) {
        $errors[] = "Please select a valid payment method.";
    }

    if (!empty($errors)) {
        // Return errors to the client
        header('Content-Type: application/json');
        echo json_encode(['errors' => $errors]);
        exit();
    }

    // Process the donation based on the payment method
    try {
        switch ($paymentMethod) {
            case 'creditCard':
                // Create a PaymentIntent with Stripe
                $paymentIntent = \Stripe\PaymentIntent::create([
                    'amount' => $amount * 100, // Stripe uses cents
                    'currency' => 'usd',
                    'payment_method_types' => ['card'],
                    'metadata' => [
                        'name' => $name,
                        'email' => $email
                    ]
                ]);
                $clientSecret = $paymentIntent->client_secret;
                break;
            case 'paypal':
                // Integrate with PayPal
                // ... (PayPal integration code here)
                break;
            case 'bankTransfer':
                // Provide bank transfer instructions
                // ... (Bank transfer handling code here)
                break;
        }

        // Store donation information in database (use prepared statements)
        $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
        $stmt = $pdo->prepare("INSERT INTO donations (name, email, amount, payment_method) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $amount, $paymentMethod]);

        // Send confirmation email
        $to = $email;
        $subject = "Thank you for your donation";
        $message = "Dear $name,\n\nThank you for your generous donation of $$amount. Your support makes a real difference in people's lives.\n\nBest regards,\nYour Charity Team";
        $headers = "From: noreply@yourcharity.org";

        mail($to, $subject, $message, $headers);

        // Return success response
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'clientSecret' => $clientSecret ?? null]);
    } catch (Exception $e) {
        // Log the error and return a generic error message
        error_log($e->getMessage());
        header('Content-Type: application/json');
        echo json_encode(['error' => 'An error occurred while processing your donation. Please try again later.']);
    }
    exit();
}
?>