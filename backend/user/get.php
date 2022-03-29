<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

function connect()
{
    $db=new mysqli("localhost","admin","admin","admin");
    return $db;
}
 
$dato=json_decode(file_get_contents("php://input")); 

if(!$dato)
{
    exit("No se Encontraron Datos");
}

$nombre=$dato -> nombre;
$password=$dato -> password;

$db=connect();

$sql="SELECT * FROM users WHERE nombre = '$nombre' AND contraseña = '$password'";

$result = mysqli_query($db,$sql);

if($result -> num_rows ==0){
$resultArray= array("fallo"=>"Usuario o Contraseña Incorrecta");
}
else{
    $resultArray = $result -> fetch_array();
}

echo(json_encode($resultArray));



