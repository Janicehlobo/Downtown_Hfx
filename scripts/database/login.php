<?php
/*Mahnoush*/
require_once 'password.php'; 
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
    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   if($_POST){
    $loginEmeil = $_POST['loginEmail'];
    $loginPassword = $_POST['loginPass'];  
   
    $sql = "SELECT user.iduser, user.email, user.password, user.ustatus, access.role FROM user, access WHERE user.email = :loginEmeil AND user.iduser = access.user_iduser ";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array('loginEmeil' => $loginEmeil ));   

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = count($result); 
    $status = new stdClass();

    if(password_verify($loginPassword, $result["password"] )){         
     if ($count == 5){    
         $status->wasSuccessful = true;
         $status->userPass = true;
         $status->userType = $result["role"];
         $status->userStatus = $result["ustatus"];
         $status->userId = $result["iduser"];
         $_SESSION["userlogin"] = $result["iduser"];
         $_SESSION["userrole"] = $result["role"];
         $_SESSION["useremail"] = $result["email"];
         $_SESSION["isLoggedIn"] = true;
         $_SESSION["isAdmin"] = true;
    }elseif ($count == 5) {
         $status->wasSuccessful = true;
         $status->userPass = true;
         $status->userType = $result["role"];
         $status->userStatus = $result["ustatus"];
         $status->userId = $result["iduser"];
         $_SESSION["userlogin"] = $result["iduser"];
         $_SESSION["userrole"] = $result["role"];
         $_SESSION["useremail"] = $result["email"];
         $_SESSION["isLoggedIn"] = true;
         $_SESSION["isAdmin"] = false;   
    }else{
        $status->wasSuccessful = false;
        $_SESSION["isLoggedIn"] = false;
    }
    }else if ($count == 5) {
         $status->wasSuccessful = false;
         $status->userPass = false;         
         $_SESSION["isLoggedIn"] = false; 
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
