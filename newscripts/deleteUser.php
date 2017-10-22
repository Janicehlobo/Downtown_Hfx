<?php
/*Vivek Karunakaran*/

session_start();
$username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {

   $conn = new PDO($dsn, $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    $iduser = $_POST['iduser'];

	$user_SQLinsert = "DELETE FROM 	user where iduser = (:iduser)"; 
	
	$result1 = $conn->prepare($user_SQLinsert);
	$result1 -> execute(array('iduser' => $iduser));
	

   if ($result1){
	   echo "User deleted successfully";	
     }
     else{
	    echo "Could not delete user, Please try again";
	   }
	   $conn = null;
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>