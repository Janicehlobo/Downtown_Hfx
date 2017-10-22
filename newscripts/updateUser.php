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
	
	$emailUser = $_POST['email'];

	$firstname = $_POST['fname'];
	$lastname = $_POST['lname'];
	$telephone = $_POST['phone'];
	$company = $_POST['company'];
	$btype = $_POST['btype'];
    
	
	$sql2 = ("UPDATE user set company = '$company', firstname = '$firstname', lastname='$lastname', telephone = '$telephone' , company='$company', btype = '$btype' where email = '$emailUser'");
		$stmt2 = $conn->prepare($sql2);
		$stmt2->execute();
		
	
}
if ($stmt2){
	   echo "Changes made successfully";	
     }
     else{
	    echo "Could not save changes, Please try again";
	   }
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>