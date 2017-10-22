<?php
/*Vivek Karunakaran*/

session_start();
$username="jh_lobo";
$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {
	
   $conn = new PDO($dsn, $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
  $sql = ("SELECT * from user");
  
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    // Output all the rows in JSON format
    echo json_encode($stmt->fetchAll());
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>