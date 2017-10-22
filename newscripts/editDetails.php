<?php
/*Vivek Karunakaran*/

session_start();
 $username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {
     $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	 
	$company = $_POST['company'];
   
    $sql = "SELECT * from userDetails 
	where userDetails.companyname='$company' ORDER BY lastmodified DESC LIMIT 1";
	
	
    $stmt = $conn->prepare($sql);
	
    $stmt->execute();  
	
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    // Output all the rows in JSON format
	$result = $stmt->fetchAll();
    echo json_encode($result);

}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>