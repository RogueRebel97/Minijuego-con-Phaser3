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

$nombre=$dato -> nombre;
$password=$dato -> password;

$arrayResponse = array();

$userRegex = "/^[a-zA-Z]{3,4}$/";
$passRegex = "/^[A-Za-z0-9]{3,5}/";

if(preg_match($userRegex,$nombre) && preg_match($passRegex,$password)){

$stmt = $db -> prepare("INSERT INTO `users` (`nombre`, `contrasena`) VALUES (?,?);");
$stmt->bind_param("ss", $nombre, $password);
    
$stmt -> execute();

$result= $stmt -> get_result();

if($result == true){
    echo(json_encode($arrayResponse));
}else{
    $arrayResponse=array("fallo"=>"Hubo un fallo al Registrar el usuario, resultado erroneo");
    echo(json_encode($arrayResponse));

}



}else
{

    $arrayResponse=array("fallo"=>"Usuario o Contraseña Invalidos");
    echo(json_encode($arrayResponse));

}


$db -> close();
$stmt -> close();

