<?php
 //fatma
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

  session_start();
     if (isset($_SESSION['userlogin'])){
         $userid = $_SESSION['userlogin'];     
      }  
  
   if($_POST){
    date_default_timezone_set('America/Halifax');
    $TypeValue = $_POST['TypeValue'];       
   $createdate = date('Y-m-d');
    $sql  = "INSERT INTO dropdowntable (dropdownName,dropdownValue,createdAt,dstatus,createdBy) values ('Type', :TypeValue , :createdate ,'Active', :userid)" ;
  
   $stmt = $conn->prepare($sql);
   $stmt->execute(array('TypeValue' => $TypeValue , 'createdate' => $createdate , 'userid' => $userid));
   echo "New record created successfully";       
  }
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>
 









