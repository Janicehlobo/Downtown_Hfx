<?php
/*Vivek Karunakaran*/

session_start();
$username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";


$password="A00415463";

try {
	
   $conn = new PDO($dsn, $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $company = $_POST['company'];

    $year = $_POST['year'];
	$monthrange = $_POST['month'];
	$colNames = json_decode($_POST['colNames']);
	$colValues = json_decode($_POST['colValues']);
	$sql = ("SELECT btype from user where company = '$company'");
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
	
	$business = $result["btype"];
	

	$user_SQLinsert = "INSERT INTO userDetails (companyname, BusinessType, year, monthrange";
	
	foreach($colNames as $colName){
		
		
		$user_SQLinsert .= ",";
	$user_SQLinsert .= $colName;
	}
	
	$user_SQLinsert .= ")";	
	$user_SQLinsert .= " VALUES ('$company', '$business', '$year', '$monthrange'";
	foreach($colValues as $colValue){
		$user_SQLinsert .= ",";
		$user_SQLinsert .= "'".$colValue."'";
	
	}

	
	
		$user_SQLinsert .= ");";

	$result1 = $conn->prepare($user_SQLinsert);
	

	$result1 -> execute();
	
	
   if ($result1){
	   echo "Data saved successful";	
     }
     else{
	    echo "Insert into table Failed";
	   }
	   $conn = null;
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>