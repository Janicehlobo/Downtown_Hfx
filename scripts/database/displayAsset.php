<?php
/*Fatma*/
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
    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


     if (isset($_SESSION['userlogin'])){
         $userid = $_SESSION['userlogin'];
      }   

    $sql = "SELECT dropdownValue FROM dropdowntable WHERE dropdownName = 'AssetSize' AND dstatus = 'Active'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    // Output all the rows in JSON format
    echo json_encode($stmt->fetchAll());
   
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>