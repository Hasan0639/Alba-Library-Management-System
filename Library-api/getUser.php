<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "library_db");

$user_id = $_GET["user_id"];

$sql = "SELECT user_id, full_name, email, role, status FROM users WHERE user_id = $user_id";$result = $conn->query($sql);

echo json_encode($result->fetch_assoc());
?>