<?php
/*fatma & mahnoush*/
 
session_start();
$username="jh_lobo";
//print "enter today";
$dsn="mysql:dbname=jh_lobo;host=localhost";
//die("File not found");
$password="A00415463";

try {
   
    $conn = new PDO($dsn, $username, $password);
    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if($_POST){

    //$emailUser = mysql_real_escape_string($_POST['emailUser']);
    $emailUser = $_POST['email'];
	$passUser = $_POST['password'];
  //echo $emailUser;
    $sql = ("SELECT  iduser, email, password from user where email = :email");
    $stmt = $conn->prepare($sql);
    $stmt->execute(array('email' => $emailUser));

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = count($result);   
    $status = new stdClass();
  //echo $result["password"];
  //echo $passUser;
    if ($count == 3){ 
	if($result["password"] != $passUser ){
		$status->userId= "error";
		
	}
	else{
    $status->userId = $result["iduser"];
	//echo $userId;
	//echo "valid";
    }
	}
    elseif($count == 1) {
		
    $status->userId = 0;
	//echo $status;
	//echo "invalid";
  }
    
    echo json_encode($status);   
} 
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>