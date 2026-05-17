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
$title = $data->title;
$category_id = $data->category_id;
$author = $data->author;
$publish_date = $data->publish_date;
$shelf = $data->shelf;
$row_number = $data->row_number;
$image_url = $data->image_url;
$status = $data->status;
$total_copies = $data->total_copies;
$description = $data->description ?? "";

$sql = "UPDATE books SET
title = '$title',
category_id = '$category_id',
author = '$author',
publish_date = '$publish_date',
shelf = '$shelf',
row_number = '$row_number',
image_url = '$image_url',
status = '$status',
total_copies = '$total_copies',
description = '$description'
WHERE book_id = '$book_id'";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>