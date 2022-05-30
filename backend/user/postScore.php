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

$db=connect();

$sql1="UPDATE users SET score = '$score' WHERE id = '$id';";
$result1 = mysqli_query($db,$sql1);


    
$sql2 = "UPDATE users SET record = '$score' WHERE id = '$id'AND record < score";
$result2 = mysqli_query($db,$sql2);



 






?>