<?php
    $host = 'localhost:port';
	$user = 'user';
	$password = 'password';
	$db = 'database';

	$conection = new mysqli( $host, $user, $password, $db);
	$conection->query("SET NAMES 'utf8'");
	if(!$conection){
		echo "Error en la conexión";
	}
   
?>