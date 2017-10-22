<?php
//mahnoush
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

	$conn = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    date_default_timezone_set('America/Halifax');
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$password = $_POST['password'];
	$hashpass = password_hash($password, PASSWORD_DEFAULT);
	$createdAt = date('y-m-d');

	$user_SQLinsert = "INSERT INTO user (firstName, lastName, email, password, ustatus, createdAt, telephone)
	VALUES (:fname, :lname, :email, :hashpass , 'active', :createdAt , :phone)"; 

	$result1 = $conn->prepare($user_SQLinsert);
	

	$result1 -> execute(array('fname' => $fname , 'lname' => $lname , 'email' => $email , 'phone' => $phone ,
		                     'createdAt' => $createdAt , 'hashpass' => $hashpass));
	$last_id = $conn->lastInsertId();

	$acceess_SQLinsert = "INSERT INTO access (role, createdAt, user_iduser)
	VALUES ('user', :createdAt , '$last_id')";
	$result2 = $conn->prepare($acceess_SQLinsert);
	$result2 ->execute(array('createdAt' => $createdAt ));
   if ($result1 && $result2){
	   echo "Insert into table user successful";	
     }
     else{
	    echo "Insert into table user Failed";
	   }
	   $conn = null;
	   }
	   
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }  
	   
?>


