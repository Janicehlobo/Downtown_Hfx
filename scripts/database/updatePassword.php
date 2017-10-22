<?php
/*fatma*/
require_once 'password.php';
session_start();
ini_set('display_errors',1);
error_reporting(E_ALL); 

 $servername = file_get_contents("../../config/servername.txt");
 $servername = trim($servername);
 $username = file_get_contents("../../config/username.txt");
 $username = trim($username);
 $port = file_get_contents("../../config/port.txt");
 $port = trim($port);
 $password = file_get_contents("../../config/password.txt");
 $password = trim($password);
 $dbname = file_get_contents("../../config/database.txt");
 $dbname = trim($dbname);

try {

	$conn = new PDO("mysql:host=localhost;port=$port;dbname=$dbname", $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
     
    $pass = $_POST['pass'];
   // $id = $_POST['id'];  
    $key = $_POST['getkey'];  
    $hashpassword = password_hash($pass, PASSWORD_DEFAULT);
    $decodedKey = base64_decode($key);
    $keyValues = explode("-", $decodedKey);

  // $id = ("UPDATE user set password = '$hashpassword' where AutoKey = '$key'");
   $id = ("UPDATE user set password = :password, AutoKey=NULL where AutoKey = :key and iduser = :id ");

    $stmt = $conn->prepare($id);
    $stmt->bindValue(':password', $hashpassword);
    $stmt->bindValue(':key', $key);
    $stmt->bindValue(':id', $keyValues[1]);
    $stmt->execute(); 
    
    $count = $stmt->rowCount();
   if ($count != 1) {
             echo "Something went wrong. Unable to update password.";
   } else {
             echo "Password has been updated";
  }


	   $conn = null;


	   }
	   
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }    
	   
?>


