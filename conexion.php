<?php
    $host = 'localhost:3307';
	$user = 'admin';
	$password = '330600';
	$db = 'refaccionariao';

	$conection = new mysqli( $host, $user, $password, $db);
	$conection->query("SET NAMES 'utf8'");
	if(!$conection){
		echo "Error en la conexión";
	}
   
?>