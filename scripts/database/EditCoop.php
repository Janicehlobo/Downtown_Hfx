<?php
/*Mahnoush*/
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
    $idcoop = $_POST['idcoop'];
    $CoopName = $_POST['CoopName'];
    $industry = $_POST['industry'];
    $postalcode = $_POST['postalcode'];
    $type = $_POST['type'];
    $province = $_POST['province'];
    $country = $_POST['country'];
    $language = $_POST['language'];
    $CoopStatus = $_POST['CoopStatus'];
    $updatedAt = date('y-m-d');  

   $sql = ("UPDATE cooptable SET coopName = :CoopName , industry = :industry , 
     postalCode = :postalcode , type = :type, country = :country, province = :province, 
     language = :language, cstatus = :CoopStatus, updatedAt = :updatedAt, 
     updatedBy = :userid  where idcoop = :idcoop ");


    $stmt = $conn->prepare($sql);
    $stmt->execute(array('CoopName' => $CoopName , 'postalcode' => $postalcode, 'industry' => $industry,
                  'type' => $type, 'country' => $country ,'province' => $province ,'language' => $language,
                  'CoopStatus' => $CoopStatus, 'userid' => $userid, 'idcoop' => $idcoop, 'updatedAt' => $updatedAt ));

    echo "Coop has been updated";

}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>