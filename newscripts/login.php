<?php

/*Vivek Karunakaran*/

session_start();
$username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {

   $conn = new PDO($dsn, $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$password = $_POST['password'];
	$company = $_POST['company'];
	$btype = $_POST['btype'];


	$user_SQLinsert = "INSERT INTO user (firstName, lastName, email, password,btype, company, telephone)
	VALUES (:fname, :lname, :email, :password ,:btype , :company , :phone)"; 

	$result1 = $conn->prepare($user_SQLinsert);
	

	$result1 -> execute(array('fname' => $fname , 'lname' => $lname , 'email' => $email , 'phone' => $phone ,
		                     'password' => $password ,'btype' => $btype, 'company' => $company));
	

	
   if ($result1){
	   echo "User created successfully";	
     }
     else{
	    echo "Could not create user, Please try again";
	   }
	   $conn = null;
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>