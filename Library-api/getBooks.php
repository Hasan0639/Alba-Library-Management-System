<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "library_db");

$sql = "
SELECT b.*, c.category_name AS category
FROM books b
LEFT JOIN categories c 
ON b.category_id = c.category_id
";

$result = $conn->query($sql);

$books = [];

while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

echo json_encode($books);
?>