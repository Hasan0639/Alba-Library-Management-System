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

$user_id = $data->user_id;
$book_id = $data->book_id;

$sql = "INSERT INTO favorite_books (user_id, book_id)
VALUES ($user_id, $book_id)";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>