<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");


require_once('../connect.php');

$db = connect();

$dato=json_decode(file_get_contents("php://input")); 

if(!$dato)
{
    exit("No se Encontraron Datos");
}

$score=$dato -> score;
$id=$dato ->id;



$stmt1 = $db -> prepare("UPDATE users SET score = ? WHERE id = ?;");
$stmt1->bind_param("ii", $score, $id);
$stmt1 -> execute();

// $result1 = mysqli_query($db,$sql1);
$result1= $stmt1 -> get_result();

    
$stmt2 = $db -> prepare("UPDATE users SET record = ? WHERE id = ? AND record < score");
$stmt2->bind_param("ii", $score, $id);
$stmt2 -> execute();

// $result2 = mysqli_query($db,$sql2);
$result2= $stmt2 -> get_result();


 



$db -> close();
$stmt1 -> close();
$stmt2 -> close();


?>