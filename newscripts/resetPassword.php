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
	$currpass = $_POST['currpassword'];
	$newpass = $_POST['newpassword'];
    $sql = ("SELECT iduser,email,password from user where email = :email");
    $stmt = $conn->prepare($sql);
	
			 
    $stmt->execute(array('email' => $emailUser));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
	$e=$result["password"];
    $count = count($result); 
	if($count==3)
	{
	
	if($currpass == $result["password"])
	{
		$sql2 = ("UPDATE user set password = '$newpass' where email = '$emailUser'");
		$stmt2 = $conn->prepare($sql2);
		$stmt2->execute();
		$result=3;
	}
	 else{
		 
		 $result=1;
	 }
	}
	else
	{
		$result=0;
	}

    echo json_encode($result);   
 
}
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>