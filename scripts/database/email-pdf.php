<?php
//Gurmeet Singh
session_start();
require("PHPMailer/PHPMailerAutoload.php");

if (!empty($_POST['data'])) {
	$data = base64_decode($_POST['data']);
	
	if (isset($_SESSION["userlogin"])){
         $userid = $_SESSION['userlogin'];
		 $useremail = $_SESSION['useremail'];
	  }
	
	// Copy the file to the local filesystem temporarily
	$attachmentFileLocation = "./reportsTemp/tempfile.pdf";	
	file_put_contents($attachmentFileLocation, $data);

	// Email the file
	$mail = new PHPMailer(); // create a new object
	$mail->IsSMTP(); // enable SMTP
	$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
	$mail->SMTPAuth = true; // authentication enabled
	$mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for Gmail
	$mail->Host = trim(file_get_contents("../../config/host.txt"));
	$mail->Port = 587; // or 587
	$mail->IsHTML(true);
	$mail->Username = trim(file_get_contents("../../config/email_username.txt"));
	$mail->Password = trim(file_get_contents("../../config/email_password.txt"));
	$mail->SetFrom(trim(file_get_contents("../../config/email_username.txt")));
	$mail->Subject = "Report";
	$mail->Body = "Find the Report in the attachment";
	$mail->AddAddress($useremail);
	$mail->addAttachment($attachmentFileLocation, 'report.pdf');	

	 if(!$mail->Send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	 } else {
	    echo "Message has been sent";
	 }
	
	// Delete the temporary file
	unlink($attachmentFileLocation);

} else {
	echo "No data sent";
}

?>