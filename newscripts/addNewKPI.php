<?php
/*Vivek Karunakaran*/
session_start();
$username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {
	print "try";
   $conn = new PDO($dsn, $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $newkpiVal = $_POST['newkpiVal'];

	print "hello";

	

	$user_SQLinsert = "INSERT INTO KPITable (KPIName)
	VALUES (:newkpiVal)"; 
	
	$result1 = $conn->prepare($user_SQLinsert);
	$result1 -> execute(array('newkpiVal' => $newkpiVal));
	
	$user_SQLalter = "ALTER TABLE userDetails ADD $newkpiVal VARCHAR(255)";	
	$result2 = $conn->prepare($user_SQLalter);
	$result2 -> execute();

	
   if ($result1){
	   echo "KPI added successfully";	
     }
     else{
	    echo "Could not add KPI, Please try again";
	   }
	   $conn = null;
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>