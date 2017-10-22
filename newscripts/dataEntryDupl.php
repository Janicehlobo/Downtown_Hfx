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
	$employees = $_POST['emp'];
	$sales = $_POST['sales'];
	$officespace = $_POST['size'];
	$Taxpaid = $_POST['tax'];
	

    $sql = ("SELECT monthrange,year from reportTable where monthrange = :month AND companyname = :company");
    $stmt = $conn->prepare($sql);
    $stmt->execute(array('month' => $monthrange, 'company' => $company));

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	
    $count = count($result);  
	echo $count;
	
	  
 
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>