<?php
/*mahnoush*/
session_start();
ini_set('display_errors',1);
error_reporting(E_ALL); 

 $servername = file_get_contents("../../config/servername.txt");
 $servername = trim($servername);
 $username = file_get_contents("../../config/username.txt");
 $username = trim($username);
 $port = file_get_contents("../../config/port.txt");
 $port = trim($port);
 $password = file_get_contents("../../config/password.txt");
 $password = trim($password);
 $dbname = file_get_contents("../../config/database.txt");
 $dbname = trim($dbname);

try {

	$conn = new PDO("mysql:host=localhost;port=$port;dbname=$dbname", $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if (isset($_SESSION["userlogin"])){
         $userid = $_SESSION['userlogin'];
      }
     
    $coop = $_POST['coop'];   

    
    $id = ("SELECT idcoop from cooptable where coopName = :coopName ");

    $stmt = $conn->prepare($id);
    $stmt->execute(array('coopName' => $coop)); 

      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    // Output all the rows in JSON format
      echo json_encode($stmt->fetchAll());
	
	   $conn = null;

	   }
	   
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }    
	   
?>


