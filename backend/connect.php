<?php
session_start();

// session_register('header');

// $_SESSION['header'] = 'Access-Control-Allow-Origin: http://localhost:4200';
$header = 'Access-Control-Allow-Origin: http://localhost:4200';
var_export($header);

function connect()
{
    $db=new mysqli("localhost","admin","admin","admin");
    return $db;
}


$_SESSION["connect"] = connect();



















?>