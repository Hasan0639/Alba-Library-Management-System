<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

$conn = new mysqli("localhost", "root", "", "library_db");

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;

$user_id = $data->user_id;

$sql = "UPDATE users SET full_name='$name', email='$email' WHERE user_id=$user_id";
if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>