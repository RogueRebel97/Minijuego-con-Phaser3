<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");



require_once('../connect.php');

$db = connect();

// function connect()
// {
//     $db=new mysqli("localhost","admin","admin","admin");
//     return $db;
// }


$sql="SELECT id,nombre, record FROM users ORDER BY record DESC";

$result = mysqli_query($db,$sql);


if($result -> num_rows ==0){
    $resultArray= array("fallo"=>"Error al mostrar puntuaciones");
    }
    else{
        $resultArray = $result -> fetch_all(MYSQLI_ASSOC);
    }
  

    echo(json_encode($resultArray));











?>