<?php
function connect_db() {
 $servername = "servername";
 $username = "username";
 $password = "password";
 $dbname = "dbname";

 $conn = new mysqli($servername, $username, $password, $dbname);

 if ($conn->connect_error) {
	 die("Connection failed: " . $conn->connect_error);
 }
 return $conn;
}
?>
