<?php
 // fatma
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
  
  
     if (isset($_SESSION["userlogin"])){
         $userid = $_SESSION['userlogin'];
      }  
  
   if($_POST){
    date_default_timezone_set('America/Halifax');
    $IndustryVal = $_POST['IndustryValue'];    
    $createdate = date('Y-m-d');
   
 $sql  = "INSERT INTO dropdowntable (dropdownName, dropdownValue, createdAt, createdBy ,dstatus) 
          values ('Industry', :IndustryVal, :createdate , :userid ,'Active')" ;
 
   $stmt = $conn->prepare($sql);
   $stmt->execute(array('IndustryVal' => $IndustryVal , 'createdate' => $createdate , 'userid' => $userid));
   echo "New record created successfully";
  }
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>
 
