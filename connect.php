<?php
function connect_db() {
    $servername = "servername";
    $username = "username";
    $password = "password";
    $dbname = "dbname";
    
    // connects to database
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // checks for error
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}
?>
