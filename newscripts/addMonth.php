<?php
/*Vivek*/
 
session_start();
$username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {
   
    $conn = new PDO($dsn, $username, $password);
    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if($_POST){
 $monthrange = $_POST['monthrange'];
	
	if($monthrange=='Halfyearly')
	{   
 
		$sql1 = ("TRUNCATE TABLE monthTable");
		$stmt = $conn->prepare($sql1);
		$stmt->execute();
		$user_SQLinsert = "INSERT INTO monthTable (monthrange)
		VALUES ('January-June'),('July-December')"; 
		$result1 = $conn->prepare($user_SQLinsert);
		$result1 -> execute();
	}  
	elseif($monthrange=='Quarterly')
	{

		$sql2 = ("TRUNCATE TABLE monthTable");
		$stmt = $conn->prepare($sql2);
		$stmt->execute();
		$user_insert = "INSERT INTO monthTable (monthrange)
		VALUES ('January-March'),('April-June'),('July-September'),('October-December')"; 
		$result2 = $conn->prepare($user_insert);
		$result2 -> execute();
	}
} 
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>