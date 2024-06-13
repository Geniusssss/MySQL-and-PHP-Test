<?php
// Change the parameters below to connect to your own database
// It's not safe saved here, just for convenience
$servername = "localhost";
$username = "root";
$password = "samsamsam3";
$dbname = "course_management";

try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Set HTTP response status code to 500 if failed to connect to the database
    http_response_code(500);
    // Log error message
    error_log("Connection to database failed: " . $e->getMessage());
    die("Connection to database failed: " . $e->getMessage());
}
?>
