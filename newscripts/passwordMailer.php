<?php

/*Vivek Karunakaran*/

$host=":/var/run/mysqld/mysqld.sock";
$user="jh_lobo";
$pass="A00415463";
$db="jh_lobo";
require("PHPMailer/PHPMailerAutoload.php");
try{
if($_POST) 
{ 
$connect=mysql_connect($host, $user, $pass) or die("Could not connect to database");

mysql_select_db($db) or die(mysql_error());

$email = $_POST['email']; 

$sql= "SELECT password FROM user WHERE email ='$email'"; 
$query = mysql_query($sql); 
if(!$query)  
    { 
    die(mysql_error()); 
    } 
if(mysql_affected_rows() != 0) 
    { 
$row=mysql_fetch_array($query); 
$password=$row["password"]; 
 
$mail = new PHPMailer(); // create a new object
	$mail->IsSMTP(); // enable SMTP
	$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
	$mail->SMTPAuth = true; // authentication enabled
	$mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for Gmail
	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 587; // or 587
	$mail->IsHTML(true);
	$mail->Username = 'downtownhalifaxns@gmail.com';
	$mail->Password = 'Halifax123';
	$mail->SetFrom('downtownhalifaxns@gmail.com');
	$mail->Subject = "Forgot Password";
    $mail->Body = "Please use this password to login and reset it again." .$password;
	$mail->AddAddress($email);
	

	 if(!$mail->Send()) {
		 $status=0;
	   // echo "Mailer Error: " . $mail->ErrorInfo;
	 } else {
		 $status=2;
	   // echo "Message has been sent";
	 }
//print "An email containing the password has been sent to you"; 
    } 
else  
    { 
$status=1;
   // echo("no such login in the system. please try again."); 
    } 
	echo json_encode($status);  
} }
catch(Exception $e)
{
  echo "Connection failed: " . $e->getMessage();
}
?>