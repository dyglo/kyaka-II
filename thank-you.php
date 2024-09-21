<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Donation</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Thank You for Your Donation!</h1>
    </header>
    <main>
        <p>Your generous donation of $<?php echo htmlspecialchars($_GET['amount'] ?? ''); ?> has been received.</p>
        <p>Your support makes a real difference in people's lives. We appreciate your kindness and generosity.</p>
        <p><a href="index.html">Return to Homepage</a></p>
    </main>
</body>
</html>