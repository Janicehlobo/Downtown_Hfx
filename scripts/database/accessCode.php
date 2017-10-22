<?php


 $servername = file_get_contents("../../config/servername.txt");
 $servername = trim($servername);
 $username = file_get_contents("../../config/username.txt");
 $username = trim($username);
 $password = file_get_contents("../../config/password.txt");
 $password = trim($password);
 $dbname = file_get_contents("../../config/database.txt");
 $dbname = trim($dbname);
 $port = file_get_contents("../../config/port.txt");
 $port = trim($port);

 $pass = $_POST["password"];
 $accessCode = trim(file_get_contents("../../config/accessCode.txt"));


if ($pass != $accessCode)
  { exit;
 }else{
  echo "true";
 } 

?>
