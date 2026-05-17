<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

$conn = new mysqli("localhost", "root", "", "library_db");

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "error" => $conn->connect_error
    ]));
}

$data = json_decode(file_get_contents("php://input"));

$title = $data->title ?? "";
$category_id = $data->category_id ?? "";
$author = $data->author ?? "";
$publish_date = $data->publish_date ?? "";
$shelf = $data->shelf ?? "";
$row_number = $data->row_number ?? "";
$image_url = $data->image_url ?? "";
$status = $data->status ?? "Available";
$total_copies = $data->total_copies ?? 1;
$description = $data->description ?? "";

$sql = "INSERT INTO books 
(title, author, publish_date, shelf, row_number, image_url, status, total_copies, taken_copies, category_id, description)
VALUES 
('$title', '$author', '$publish_date', '$shelf', '$row_number', '$image_url', '$status', '$total_copies', 0, '$category_id', '$description')";

if ($conn->query($sql)) {
    echo json_encode([
        "success" => true
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => $conn->error
    ]);
}

$conn->close();
?>