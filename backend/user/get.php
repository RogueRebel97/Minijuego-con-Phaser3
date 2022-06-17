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

$nombre= $dato -> nombre;
$password= $dato -> password;




$stmt = $db -> prepare("SELECT * FROM users WHERE nombre = ? AND contrasena = ?");

$stmt->bind_param("ss", $nombre, $password);

$stmt -> execute();

$result= $stmt -> get_result();


// $result = mysqli_query($db,$sql);

if($result -> num_rows ==0){

$resultArray= array("fallo"=>"Usuario o Contraseña Incorrecta");
}

else{
    
    $resultArray = $result -> fetch_array();
}

echo(json_encode($resultArray));

$db -> close();
$stmt -> close();

