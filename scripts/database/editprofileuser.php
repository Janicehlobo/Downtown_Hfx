<?php

/*Fatma*/
 
session_start();

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
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     if (isset($_SESSION['userlogin'])){
         $userid = $_SESSION['userlogin'];
     
      }

    date_default_timezone_set('America/Halifax');
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $updatedAt = date('y-m-d');  
   

    $sql = ("UPDATE user SET firstName = :firstname , lastName = :lastname , 
     email = :email, telephone = :phone , updatedAt = :updatedAt , updatedBy = '$userid'  where iduser = '$userid' "); 

    $stmt = $conn->prepare($sql);
    $stmt->execute(array('firstname' => $firstname , 'lastname' => $lastname , 'email' => $email,
                  'phone' => $phone , 'updatedAt' => $updatedAt ));

    
    echo "User information has been updated";

}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>