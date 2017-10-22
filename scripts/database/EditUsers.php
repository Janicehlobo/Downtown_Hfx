<?php
//mahnoush
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
    
     if (isset($_SESSION["userlogin"])){
         $userid = $_SESSION['userlogin'];
      }
    date_default_timezone_set('America/Halifax');
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];        
    $status = $_POST['status'];
    $id = $_POST['id'];
    $role = $_POST['role'];
    $updatedAt = date('y-m-d');
    $coopid = $_POST['coopIDUser'];
    $coopName = $_POST['usercoopname'];


 if ($role == "user"){  
   $sql3 = ("SELECT  * from cooptable where coopName = :coopName ");
  
   $stmt3 = $conn->prepare($sql3);
   $stmt3->execute(array('coopName' => $coopName ));
   $row= $stmt3->fetch(PDO::FETCH_ASSOC);
    
   $newcoopid = $row['idcoop'];
   

    $sql1 = ("UPDATE user SET ustatus = :status , firstName = :fname , lastName = :lname , telephone = :phone,
             email = :email ,  updatedAt = :updatedAt, updatedBy = :userid where iduser = :id ");
    $sql2 = ("UPDATE access  SET role = :role , updatedAt = :updatedAt, updatedBy = :userid , cooptable_idcoop = '$newcoopid' where user_iduser = :id ");

    $stmt1 = $conn->prepare($sql1);
    $stmt2 = $conn->prepare($sql2);

    $stmt1->execute(array('fname' => $fname , 'lname' => $lname , 'phone' => $phone , 'email' => $email , 'status' => $status,
                            'updatedAt' => $updatedAt ,'userid' => $userid ,'id' => $id ));
    $stmt2->execute(array('role' => $role ,'updatedAt' => $updatedAt ,'userid' => $userid ,'id' => $id ));
}

  elseif ($role == "admin"){
    $sql1 = ("UPDATE user SET ustatus = :status , firstName = :fname, lastName = :lname , telephone = :phone,
             email = :email ,  updatedAt = :updatedAt, updatedBy = :userid where iduser = :id ");
    $sql2 = ("UPDATE access  SET role = :role , updatedAt = :updatedAt, updatedBy = :userid , cooptable_idcoop = null where user_iduser = :id ");

    $stmt1 = $conn->prepare($sql1);
    $stmt2 = $conn->prepare($sql2);

    $stmt1->execute(array('fname' => $fname , 'lname' => $lname , 'phone' => $phone , 'email' => $email, 'status' => $status,
                           'updatedAt' => $updatedAt ,'userid' => $userid ,'id' => $id ));
    $stmt2->execute(array('role' => $role ,'updatedAt' => $updatedAt ,'userid' => $userid ,'id' => $id ));   
  }
      echo("update has been done successfully");
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>