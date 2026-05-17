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

$conn->query("INSERT INTO borrow_history (user_id, book_id) VALUES ($user_id, $book_id)");
$conn->query("
  UPDATE books
  SET 
    taken_copies = taken_copies + 1,
    status = IF(taken_copies + 1 >= total_copies, 'Taken', 'Available')
  WHERE book_id=$book_id
");

echo json_encode(["success" => true]);
?>