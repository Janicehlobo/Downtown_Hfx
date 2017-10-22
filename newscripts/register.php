<?php
session_start();

$username="root";
$password="";
$dbname="MyDB";
$port="3306";
try {
	
   $conn = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);
   
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$password = $_POST['passworduser'];
	$company = $_POST['companyname'];
	
	
	$user_SQLinsert = "INSERT INTO user (firstName, lastName, email, password,businesstype, companyname, telephone)
	VALUES (:fname, :lname, :email, :password , 'abc', :company , :phone)"; 

	$result1 = $conn->prepare($user_SQLinsert);
	

	$result1 -> execute(array('fname' => $fname , 'lname' => $lname , 'email' => $email , 'phone' => $phone ,
		                     'password' => $password , 'company' => $company));
	

	
   if ($result1){
	   echo "Insert into table user successful";	
     }
     else{
	    echo "Insert into table user Failed";
	   }
	   $conn = null;
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>