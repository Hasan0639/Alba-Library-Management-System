<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "library_db");

$user_id = $_GET["user_id"];
$book_id = $_GET["book_id"];

$sql = "SELECT * FROM favorite_books 
        WHERE user_id = $user_id AND book_id = $book_id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["saved" => true]);
} else {
    echo json_encode(["saved" => false]);
}
?>