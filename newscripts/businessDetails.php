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
    
    $company = $_POST['company'];
    echo $company;
    $year = $_POST['year'];
	$monthrange = $_POST['month'];
	$colNames = json_decode($_POST['colNames']);
	$colValues = json_decode($_POST['colValues']);
	$sql = ("SELECT btype from user where company = '$company'");
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
	echo $result["btype"];
	$business = $result["btype"];

    echo $year;
    echo $monthrange;
    echo $business;	
	$user_SQLinsert = "INSERT INTO reportTable (companyname, BusinessType, year, monthrange";
    echo $colName;
	
	foreach($colNames as $colName){
  	$user_SQLinsert . = ",";
	$user_SQLinsert . = $colName;
			
}

$user_SQLinsert .= ")";	
echo $colValue;
$user_SQLinsert .= "VALUES ('$company', '$business', '$year', '$monthrange'";

foreach($colValues as $colValue){
	$user_SQLinsert .= ",";
	$user_SQLinsert . = "'$colValue'";
				
		}
		
		$user_SQLinsert .= ");";

	$result1 = $conn->prepare($user_SQLinsert);
	

	$result1 -> execute();
	

	
   if ($result1){
	   echo "Insert into table reportTable successful";	
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
$conn = null;
?>