<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "library_db");

$book_id = $_GET["book_id"];

$sql = "
SELECT u.user_id, u.full_name, u.email, bh.borrow_date
FROM borrow_history bh
JOIN users u ON bh.user_id = u.user_id
WHERE bh.book_id = $book_id
AND bh.return_date IS NULL
";

$result = $conn->query($sql);

$borrowers = [];

while ($row = $result->fetch_assoc()) {
    $borrowers[] = $row;
}

echo json_encode($borrowers);
?>