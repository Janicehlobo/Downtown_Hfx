<?php
//Vivek Karunakaran

session_start();
 $username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {
     $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	 if($_POST){
	$fyear = $_POST['frmyear'];
    $tyear = $_POST['toyear'];
	$business = $_POST['business'];
	
    $sql = "SELECT year,BusinessType,SUM(Taxpaid) as Total_Taxpaid,SUM(sales) as Total_Sales
	from userDetails 
	where userDetails.BusinessType='$business' && userDetails.year BETWEEN '$fyear' AND '$tyear'
	group by userDetails.year
   	order by userDetails.sales";
	
    $stmt = $conn->prepare($sql);
	
    $stmt->execute();  
	
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    // Output all the rows in JSON format
	$result = $stmt->fetchAll();
    echo json_encode($result);
}
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>