<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "library_db");

$id = $_GET["id"];

$sql = "
SELECT b.*, c.category_name AS category
FROM books b
LEFT JOIN categories c 
ON b.category_id = c.category_id
WHERE b.book_id = $id
";

$result = $conn->query($sql);

echo json_encode($result->fetch_assoc());
?>