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

$book_id = $data->book_id;
$user_id = $data->user_id;

$conn->query("
UPDATE borrow_history 
SET return_date = NOW()
WHERE book_id = $book_id 
AND user_id = $user_id
AND return_date IS NULL
LIMIT 1
");

$conn->query("
UPDATE books
SET 
taken_copies = GREATEST(taken_copies - 1, 0),
status = IF(GREATEST(taken_copies - 1, 0) >= total_copies, 'Taken', 'Available')
WHERE book_id = $book_id
");

echo json_encode(["success" => true]);
?>