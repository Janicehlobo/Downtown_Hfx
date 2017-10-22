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

	$user_SQLinsert = "INSERT INTO reportTable (companyname, year, monthrange, employees,sales, officespace, Taxpaid)
	VALUES (:company, :year, :month, :emp , :sales, :size , :tax)"; 

	$result1 = $conn->prepare($user_SQLinsert);
	

	$result1 -> execute(array('company' => $company , 'year' => $year , 'month' => $monthrange , 'emp' => $employees ,
		                     'sales' => $sales , 'size' => $officespace, 'tax' => $Taxpaid));
	

	
   if ($result1){
	   echo "Data entry successful";	
     }
     else{
	    echo "Could not add data";
	   }
	   $conn = null;
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>