<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "library_db");

$user_id = $_GET["user_id"];

$sql = "
SELECT b.*, c.category_name AS category
FROM favorite_books f
JOIN books b ON f.book_id = b.book_id
LEFT JOIN categories c ON b.category_id = c.category_id
WHERE f.user_id = $user_id
";

$result = $conn->query($sql);

$books = [];

while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

echo json_encode($books);
?>