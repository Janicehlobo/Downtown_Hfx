<?php
/*Vivek Karunakaran*/
 
session_start();
$username="jh_lobo";
$dsn="mysql:dbname=jh_lobo;host=localhost";
$password="A00415463";

try {
   
    $conn = new PDO($dsn, $username, $password);
    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   
     if($_POST){
	print "enter post";
	$emailUser = $_POST['email'];
	echo $emailUser;
    $sql = ("SELECT company from user where email = ':emailUser'");
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = count($result); 
	echo $count;

	$status = new stdClass();
	
    echo json_encode($result);   
 
}
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>