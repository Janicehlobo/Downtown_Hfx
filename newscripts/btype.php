<?php
/*Vivek Karunakaran*/

session_start();
$username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {
	
   $conn = new PDO($dsn, $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    $btype = $_POST['btype'];
	
	$user_SQLinsert = "INSERT INTO BusinessTable (BusinessType)
	VALUES (:btype)"; 

	$result1 = $conn->prepare($user_SQLinsert);
	

	$result1 -> execute(array('btype' => $btype));
	
   if ($result1){
	   echo "Business Type added successful";	
     }
     else{
	    echo "Business Type could not be added";
	   }
	   $conn = null;
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>