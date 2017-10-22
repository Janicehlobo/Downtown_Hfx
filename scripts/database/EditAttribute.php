<?php
//fatma
session_start();

 $servername = file_get_contents("../../config/servername.txt");
 $servername = trim($servername);
 $username = file_get_contents("../../config/username.txt");
 $username = trim($username);
 $port = file_get_contents("../../config/port.txt");
 $port = trim($port); $password = file_get_contents("../../config/password.txt");
 $password = trim($password);
 $dbname = file_get_contents("../../config/database.txt");
 $dbname = trim($dbname);

try {
    $conn = new PDO("mysql:host=localhost;port=$port;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    session_start();
     if (isset($_SESSION['userlogin'])){
         $userid = $_SESSION['userlogin'];     
      }
    date_default_timezone_set('America/Halifax');
    $editName = $_POST['attributeName'];
    $editValue = $_POST['attributeValue'];
    $editstatus = $_POST['status'];
   
    $updatedAt = date('y-m-d');  

    $sql = ("UPDATE dropdowntable SET dstatus = :editstatus , updatedAt = :updatedAt, 
    updatedBy = :userid  where dropdownName = :editName AND  dropdownValue = :editValue");

    $stmt = $conn->prepare($sql);
    $stmt->execute(array('editstatus' => $editstatus, 'updatedAt' => $updatedAt,'userid' => $userid,
                      'editName' => $editName,'editValue' => $editValue ));
     echo "Update has been done successfully";

}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>