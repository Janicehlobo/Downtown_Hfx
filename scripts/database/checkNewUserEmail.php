<?php
/*fatma & mahnoush*/
 
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

    //$emailUser = mysql_real_escape_string($_POST['emailUser']);
    $emailUser = $_POST['email'];
  
    $sql = ("SELECT  iduser, firstName, email from user where email = :email ");
    $stmt = $conn->prepare($sql);
    $stmt->execute(array('email' => $emailUser));

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = count($result);   
    $status = new stdClass();
  
    if ($count == 3){ 
    $status->userId = $result["iduser"];
    }
    elseif($count == 1) {
    $status->userId = 0;
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