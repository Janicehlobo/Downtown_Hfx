<?php
/*Vivek Karunakaran*/
 
session_start();
$username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {
   
    $conn = new PDO($dsn, $username, $password);
    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if($_POST){

    $emailUser = $_POST['email'];
	echo $emailUser;
	$password = $_POST['password'];
	echo $password;
    $sql = ("SELECT iduser,password,email from user where email = ':emailUser' and password=':password'");
    $stmt = $conn->prepare($sql);
	
    $stmt->execute(array('email' => $emailUser, 'password' => $password));

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = count($result); 

	echo $count;

  
    if ($count == 3){
     
   $status=$result["password"];
   echo $status;
echo "Valid Email and Password";
    }
    elseif($count==1) {
		$status=$result['password'];
   echo $status;
echo "Invalid Email and Password";
 
 
  }
    
   // echo json_encode($status);   
} 
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>