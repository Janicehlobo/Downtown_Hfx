
<?php
/*fatma*/
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
    $conn = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);

    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     session_start();
     if (isset($_SESSION['userlogin'])){
         $userid = $_SESSION['userlogin'];
     
      }
   if($_POST){
   date_default_timezone_set('America/Halifax');
   $coopName = $_POST['txtCoopName'];
   $industry = $_POST['txtindustry'];
   $type = $_POST['txttype'];
   $postalcode = $_POST['txtpostalcode'];
   $language = $_POST['txtlanguage'];
   $province = $_POST['txtprovince'];
   $country = $_POST['txtcountry'];
  // $status = $_POST['txtstatus'];      
   $date = date('Y-m-d');


   $sql  = "INSERT INTO cooptable (coopName,industry,type,postalCode,language,province,country,cstatus,createdAt,createdBy)
    values ('".$coopName."','".$industry."','".$type."','".$postalcode."','".$language."','".$province."','".$country."','Active','$date','$userid')" ;
  /* $stmt = $conn->prepare($sql);
   $stmt->execute();*/
    $result1 = $conn->exec($sql);
    $last_id = $conn->lastInsertId();


   $assig_coop  = "UPDATE access SET cooptable_idcoop='$last_id' where user_iduser='$userid'" ;
   $result2 = $conn->exec($assig_coop);

   echo "New record created successfully";
    
  }
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>




















